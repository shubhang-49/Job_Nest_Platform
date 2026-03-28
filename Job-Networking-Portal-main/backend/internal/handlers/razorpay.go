package handlers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/razorpay/razorpay-go"
)

// CreateRazorpayOrder creates a new Razorpay order
func CreateRazorpayOrder(c *gin.Context) {
	keyID := os.Getenv("RAZORPAY_KEY_ID")
	keySecret := os.Getenv("RAZORPAY_KEY_SECRET")

	if keyID == "" || keySecret == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Razorpay credentials not configured",
		})
		return
	}

	client := razorpay.NewClient(keyID, keySecret)

	// Platform fee: ₹50 INR = 5000 paise
	amount := 5000 // in paise (50 INR)

	data := map[string]interface{}{
		"amount":   amount,
		"currency": "INR",
		"receipt":  fmt.Sprintf("rcpt_%s", c.GetString("userID")),
		"notes": map[string]interface{}{
			"purpose": "Job posting platform fee",
		},
	}

	body, err := client.Order.Create(data, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create order: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"orderId":  body["id"],
		"amount":   amount,
		"currency": "INR",
	})
}

// VerifyRazorpayPayment verifies Razorpay payment signature
func VerifyRazorpayPayment(c *gin.Context) {
	var req struct {
		OrderID   string `json:"orderId" binding:"required"`
		PaymentID string `json:"paymentId" binding:"required"`
		Signature string `json:"signature" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}

	keySecret := os.Getenv("RAZORPAY_KEY_SECRET")
	if keySecret == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Razorpay secret not configured",
		})
		return
	}

	// Verify signature
	message := req.OrderID + "|" + req.PaymentID
	mac := hmac.New(sha256.New, []byte(keySecret))
	mac.Write([]byte(message))
	expectedSignature := hex.EncodeToString(mac.Sum(nil))

	if expectedSignature != req.Signature {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid payment signature",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"paymentId": req.PaymentID,
		"orderId":   req.OrderID,
	})
}
