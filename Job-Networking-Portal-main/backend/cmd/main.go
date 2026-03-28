package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/database"
	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/handlers"
	"github.com/Arpitkushwahaa/Job-Networking-Portal/backend/internal/middleware"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := database.Connect(ctx); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer database.Disconnect(context.Background())

	// Initialize Gin router
	router := gin.Default()

	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{getEnv("FRONTEND_URL", "http://localhost:3000")},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Job & Networking Portal API is running",
		})
	})

	// API routes
	api := router.Group("/api")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
			auth.GET("/me", middleware.AuthMiddleware(), handlers.GetCurrentUser)
		}

		// Profile routes
		profiles := api.Group("/profiles")
		profiles.Use(middleware.AuthMiddleware())
		{
			profiles.GET("/:id", handlers.GetProfile)
			profiles.PUT("/:id", handlers.UpdateProfile)
			profiles.POST("/extract-skills", handlers.ExtractSkills)
		}

		// Job routes
		jobs := api.Group("/jobs")
		{
			jobs.GET("", handlers.GetJobs)
			jobs.GET("/:id", handlers.GetJobByID)
			jobs.POST("", middleware.AuthMiddleware(), handlers.CreateJob)
			jobs.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdateJob)
			jobs.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeleteJob)
			jobs.POST("/:id/apply", middleware.AuthMiddleware(), handlers.ApplyToJob)
			jobs.GET("/:id/applications", middleware.AuthMiddleware(), handlers.GetJobApplications)
		}

		// Payment routes
		payments := api.Group("/payments")
		payments.Use(middleware.AuthMiddleware())
		{
			payments.POST("/verify", handlers.VerifyPayment)
			payments.GET("/history", handlers.GetPaymentHistory)
			// Razorpay routes
			payments.POST("/razorpay/create-order", handlers.CreateRazorpayOrder)
			payments.POST("/razorpay/verify", handlers.VerifyRazorpayPayment)
		}

		// AI routes
		ai := api.Group("/ai")
		ai.Use(middleware.AuthMiddleware())
		{
			ai.POST("/match", handlers.CalculateJobMatch)
			ai.POST("/extract-skills", handlers.AIExtractSkills)
			ai.GET("/recommendations", handlers.GetRecommendations)
		}

		// Stats routes
		stats := api.Group("/users")
		stats.Use(middleware.AuthMiddleware())
		{
			stats.GET("/stats", handlers.GetUserStats)
		}
	}

	// Start server
	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
