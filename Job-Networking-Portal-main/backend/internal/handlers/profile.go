package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/database"
	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/models"
)

// GetProfile returns a user's profile
func GetProfile(c *gin.Context) {
	profileID := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(profileID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid profile ID"})
		return
	}

	collection := database.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user models.User
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":          user.ID.Hex(),
		"name":        user.Name,
		"email":       user.Email,
		"bio":         user.Bio,
		"linkedinUrl": user.LinkedinURL,
		"skills":      user.Skills,
		"createdAt":   user.CreatedAt,
	})
}

// UpdateProfile updates a user's profile
func UpdateProfile(c *gin.Context) {
	profileID := c.Param("id")
	userID := c.GetString("userId")

	// Check if user is updating their own profile
	if profileID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own profile"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(profileID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid profile ID"})
		return
	}

	var updateData struct {
		Name          string   `json:"name"`
		Bio           string   `json:"bio"`
		LinkedinURL   string   `json:"linkedinUrl"`
		Skills        []string `json:"skills"`
		WalletAddress string   `json:"walletAddress"`
	}

	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := database.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	update := bson.M{
		"$set": bson.M{
			"name":           updateData.Name,
			"bio":            updateData.Bio,
			"linkedin_url":   updateData.LinkedinURL,
			"skills":         updateData.Skills,
			"wallet_address": updateData.WalletAddress,
			"updated_at":     time.Now(),
		},
	}

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectID}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	var user models.User
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch updated profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":            user.ID.Hex(),
		"name":          user.Name,
		"email":         user.Email,
		"bio":           user.Bio,
		"linkedinUrl":   user.LinkedinURL,
		"skills":        user.Skills,
		"walletAddress": user.WalletAddress,
	})
}

// ExtractSkills extracts skills from user's bio using AI
func ExtractSkills(c *gin.Context) {
	var req struct {
		Text string `json:"text" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Call AI service for skill extraction
	// For now, return mock skills
	skills := []string{"JavaScript", "React", "Node.js", "MongoDB", "Git"}

	c.JSON(http.StatusOK, gin.H{
		"skills": skills,
	})
}
