package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User represents a user in the system
type User struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name          string             `json:"name" bson:"name"`
	Email         string             `json:"email" bson:"email"`
	Password      string             `json:"-" bson:"password"`
	Role          string             `json:"role" bson:"role"` // "candidate" or "recruiter"
	Bio           string             `json:"bio" bson:"bio"`
	LinkedinURL   string             `json:"linkedinUrl" bson:"linkedin_url"`
	Skills        []string           `json:"skills" bson:"skills"`
	WalletAddress string             `json:"walletAddress,omitempty" bson:"wallet_address,omitempty"`
	CreatedAt     time.Time          `json:"createdAt" bson:"created_at"`
	UpdatedAt     time.Time          `json:"updatedAt" bson:"updated_at"`
}

// Job represents a job posting
type Job struct {
	ID               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title            string             `json:"title" bson:"title"`
	Description      string             `json:"description" bson:"description"`
	Company          string             `json:"company" bson:"company"`
	Location         string             `json:"location" bson:"location"`
	JobType          string             `json:"jobType" bson:"job_type"`
	Salary           string             `json:"salary" bson:"salary"`
	Skills           []string           `json:"skills" bson:"skills"`
	Requirements     string             `json:"requirements" bson:"requirements"`
	PostedBy         primitive.ObjectID `json:"postedBy" bson:"posted_by"`
	WalletAddress    string             `json:"walletAddress,omitempty" bson:"wallet_address,omitempty"`
	PaymentMethod    string             `json:"paymentMethod" bson:"payment_method"` // "solana" or "razorpay"
	PaymentSignature string             `json:"paymentSignature" bson:"payment_signature"`
	ApplicantsCount  int                `json:"applicantsCount" bson:"applicants_count"`
	Status           string             `json:"status" bson:"status"` // active, closed
	CreatedAt        time.Time          `json:"createdAt" bson:"created_at"`
	UpdatedAt        time.Time          `json:"updatedAt" bson:"updated_at"`
}

// Application represents a job application
type Application struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	JobID       primitive.ObjectID `json:"jobId" bson:"job_id"`
	UserID      primitive.ObjectID `json:"userId" bson:"user_id"`
	CoverLetter string             `json:"coverLetter" bson:"cover_letter"`
	Status      string             `json:"status" bson:"status"` // pending, accepted, rejected
	MatchScore  float64            `json:"matchScore" bson:"match_score"`
	CreatedAt   time.Time          `json:"createdAt" bson:"created_at"`
	UpdatedAt   time.Time          `json:"updatedAt" bson:"updated_at"`
}

// Payment represents a blockchain payment
type Payment struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserID      primitive.ObjectID `json:"userId" bson:"user_id"`
	JobID       primitive.ObjectID `json:"jobId,omitempty" bson:"job_id,omitempty"`
	Amount      float64            `json:"amount" bson:"amount"`
	Currency    string             `json:"currency" bson:"currency"` // SOL, ETH, MATIC
	Signature   string             `json:"signature" bson:"signature"`
	FromAddress string             `json:"fromAddress" bson:"from_address"`
	ToAddress   string             `json:"toAddress" bson:"to_address"`
	Status      string             `json:"status" bson:"status"` // confirmed, pending, failed
	CreatedAt   time.Time          `json:"createdAt" bson:"created_at"`
}

// RegisterRequest represents registration input
type RegisterRequest struct {
	Name        string `json:"name" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Password    string `json:"password" binding:"required,min=6"`
	Role        string `json:"role" binding:"required"` // "candidate" or "recruiter"
	Bio         string `json:"bio"`
	LinkedinURL string `json:"linkedinUrl"`
}

// LoginRequest represents login input
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// CreateJobRequest represents job creation input
type CreateJobRequest struct {
	Title            string   `json:"title" binding:"required"`
	Description      string   `json:"description" binding:"required"`
	Company          string   `json:"company" binding:"required"`
	Location         string   `json:"location" binding:"required"`
	JobType          string   `json:"jobType" binding:"required"`
	Salary           string   `json:"salary" binding:"required"`
	Skills           []string `json:"skills" binding:"required"`
	Requirements     string   `json:"requirements"`
	WalletAddress    string   `json:"walletAddress" binding:"required"`
	PaymentSignature string   `json:"paymentSignature" binding:"required"`
}
