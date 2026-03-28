package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/database"
	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/models"
)

// GetJobs returns all job listings with optional filters
func GetJobs(c *gin.Context) {
	collection := database.GetCollection("jobs")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Build filter
	filter := bson.M{"status": "active"}

	if search := c.Query("search"); search != "" {
		filter["$or"] = []bson.M{
			{"title": bson.M{"$regex": search, "$options": "i"}},
			{"description": bson.M{"$regex": search, "$options": "i"}},
		}
	}

	if location := c.Query("location"); location != "" {
		filter["location"] = bson.M{"$regex": location, "$options": "i"}
	}

	if jobType := c.Query("jobType"); jobType != "" {
		filter["job_type"] = jobType
	}

	// Pagination
	opts := options.Find().SetSort(bson.D{primitive.E{Key: "created_at", Value: -1}})
	if limit := c.Query("limit"); limit != "" {
		opts.SetLimit(10)
	}

	cursor, err := collection.Find(ctx, filter, opts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch jobs"})
		return
	}
	defer cursor.Close(ctx)

	var jobs []models.Job
	if err = cursor.All(ctx, &jobs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode jobs"})
		return
	}

	if jobs == nil {
		jobs = []models.Job{}
	}

	c.JSON(http.StatusOK, gin.H{
		"jobs":  jobs,
		"total": len(jobs),
	})
}

// GetJobByID returns a specific job
func GetJobByID(c *gin.Context) {
	jobID := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(jobID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid job ID"})
		return
	}

	collection := database.GetCollection("jobs")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var job models.Job
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&job)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	c.JSON(http.StatusOK, job)
}

// CreateJob creates a new job posting
func CreateJob(c *gin.Context) {
	userID := c.GetString("userId")

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var req models.CreateJobRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Verify payment signature on Solana blockchain
	// For now, we'll just store it

	job := models.Job{
		Title:            req.Title,
		Description:      req.Description,
		Company:          req.Company,
		Location:         req.Location,
		JobType:          req.JobType,
		Salary:           req.Salary,
		Skills:           req.Skills,
		Requirements:     req.Requirements,
		PostedBy:         objectID,
		WalletAddress:    req.WalletAddress,
		PaymentSignature: req.PaymentSignature,
		ApplicantsCount:  0,
		Status:           "active",
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	collection := database.GetCollection("jobs")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctx, job)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create job"})
		return
	}

	job.ID = result.InsertedID.(primitive.ObjectID)

	// Store payment record
	payment := models.Payment{
		UserID:      objectID,
		JobID:       job.ID,
		Amount:      0.0001, // Platform fee
		Currency:    "SOL",
		Signature:   req.PaymentSignature,
		FromAddress: req.WalletAddress,
		ToAddress:   "", // Admin wallet
		Status:      "confirmed",
		CreatedAt:   time.Now(),
	}

	paymentCollection := database.GetCollection("payments")
	paymentCollection.InsertOne(ctx, payment)

	c.JSON(http.StatusCreated, job)
}

// UpdateJob updates a job posting
func UpdateJob(c *gin.Context) {
	jobID := c.Param("id")
	userID := c.GetString("userId")

	objectID, err := primitive.ObjectIDFromHex(jobID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid job ID"})
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	collection := database.GetCollection("jobs")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if user owns this job
	var existingJob models.Job
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&existingJob)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	if existingJob.PostedBy != userObjectID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own jobs"})
		return
	}

	var updateData map[string]interface{}
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updateData["updated_at"] = time.Now()

	update := bson.M{"$set": updateData}
	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectID}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update job"})
		return
	}

	var job models.Job
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&job)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch updated job"})
		return
	}

	c.JSON(http.StatusOK, job)
}

// DeleteJob deletes a job posting
func DeleteJob(c *gin.Context) {
	jobID := c.Param("id")
	userID := c.GetString("userId")

	objectID, err := primitive.ObjectIDFromHex(jobID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid job ID"})
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	collection := database.GetCollection("jobs")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if user owns this job
	var job models.Job
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&job)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	if job.PostedBy != userObjectID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own jobs"})
		return
	}

	_, err = collection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete job"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Job deleted successfully"})
}

// ApplyToJob creates a job application
func ApplyToJob(c *gin.Context) {
	jobID := c.Param("id")
	userID := c.GetString("userId")

	jobObjectID, err := primitive.ObjectIDFromHex(jobID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid job ID"})
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var req struct {
		CoverLetter string `json:"coverLetter"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if already applied
	collection := database.GetCollection("applications")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existingApp models.Application
	err = collection.FindOne(ctx, bson.M{
		"job_id":  jobObjectID,
		"user_id": userObjectID,
	}).Decode(&existingApp)

	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You have already applied to this job"})
		return
	}

	// Create application
	application := models.Application{
		JobID:       jobObjectID,
		UserID:      userObjectID,
		CoverLetter: req.CoverLetter,
		Status:      "pending",
		MatchScore:  0.0, // TODO: Calculate match score
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	result, err := collection.InsertOne(ctx, application)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit application"})
		return
	}

	application.ID = result.InsertedID.(primitive.ObjectID)

	// Update job applicants count
	jobCollection := database.GetCollection("jobs")
	jobCollection.UpdateOne(ctx, bson.M{"_id": jobObjectID}, bson.M{
		"$inc": bson.M{"applicants_count": 1},
	})

	c.JSON(http.StatusCreated, application)
}

// GetJobApplications returns all applications for a specific job (recruiter only)
func GetJobApplications(c *gin.Context) {
	jobID := c.Param("id")
	userID := c.GetString("userId")

	jobObjectID, err := primitive.ObjectIDFromHex(jobID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid job ID"})
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Check if user owns this job
	jobCollection := database.GetCollection("jobs")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var job models.Job
	err = jobCollection.FindOne(ctx, bson.M{"_id": jobObjectID}).Decode(&job)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	if job.PostedBy != userObjectID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only view applications for your own jobs"})
		return
	}

	// Get all applications for this job
	appCollection := database.GetCollection("applications")
	cursor, err := appCollection.Find(ctx, bson.M{"job_id": jobObjectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch applications"})
		return
	}
	defer cursor.Close(ctx)

	var applications []models.Application
	if err = cursor.All(ctx, &applications); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode applications"})
		return
	}

	// Fetch applicant details for each application
	type ApplicationWithUser struct {
		models.Application
		Applicant models.User `json:"applicant"`
	}

	var applicationsWithUsers []ApplicationWithUser
	userCollection := database.GetCollection("users")

	for _, app := range applications {
		var applicant models.User
		err := userCollection.FindOne(ctx, bson.M{"_id": app.UserID}).Decode(&applicant)
		if err == nil {
			applicationsWithUsers = append(applicationsWithUsers, ApplicationWithUser{
				Application: app,
				Applicant:   applicant,
			})
		}
	}

	c.JSON(http.StatusOK, applicationsWithUsers)
}
