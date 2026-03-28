# Razorpay Payment Integration - Environment Variables

## Overview
JobNest now supports **dual payment methods**:
- **Razorpay**: ₹50 INR (UPI, Cards, Wallets) - Default
- **Solana**: 0.0001 SOL (Phantom Wallet)

---

## Environment Variables to Add

### **1. Frontend (Vercel)**

Add these environment variables in your Vercel dashboard:

**Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

```bash
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXX
```

**How to get Razorpay Key ID:**
1. Go to https://dashboard.razorpay.com/
2. Sign up / Login
3. Navigate to **Settings** → **API Keys**
4. Click **Generate Test Keys** (for testing) or **Generate Live Keys** (for production)
5. Copy the **Key ID** (starts with `rzp_test_` or `rzp_live_`)

---

### **2. Backend (Render)**

Add these environment variables in your Render dashboard:

**Render Dashboard** → Your Backend Service → **Environment** → **Add Environment Variable**

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
```

**How to get Razorpay Keys:**
1. Go to https://dashboard.razorpay.com/
2. Navigate to **Settings** → **API Keys**
3. Copy both:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this secret, never expose in frontend)

---

## Razorpay Account Setup

### **Step 1: Create Razorpay Account**
1. Visit https://dashboard.razorpay.com/signup
2. Sign up with your email
3. Complete KYC (for live keys, test keys work without KYC)

### **Step 2: Activate Test Mode**
1. In dashboard, ensure **Test Mode** toggle is ON (top-right corner)
2. Test mode allows testing without real money

### **Step 3: Generate API Keys**
1. Go to **Settings** → **API Keys**
2. Click **Generate Test Key**
3. Copy both Key ID and Secret
4. Save them securely (Secret is shown only once)

### **Step 4: Webhook Configuration (Optional)**
For production, set up webhooks:
1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://your-backend.onrender.com/api/payments/razorpay/webhook`
3. Select events: `payment.captured`, `payment.failed`

---

## Testing Payment Flow

### **Test Mode Credentials**

Razorpay provides test cards/UPI for testing:

**Test Cards:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Test UPI:**
- UPI ID: `success@razorpay`
- Always succeeds

**Test Wallets:**
- Use any test wallet credentials provided by Razorpay

### **Testing Steps:**
1. Register as Recruiter on your app
2. Go to **Create Job**
3. Fill job details
4. Select **Razorpay** payment method
5. Click **Continue to Payment**
6. Use test credentials above
7. Verify job is created after successful payment

---

## Production Deployment

### **Switch to Live Mode:**
1. Complete KYC in Razorpay dashboard
2. Activate your account (business details required)
3. Generate **Live Keys** (starts with `rzp_live_`)
4. Update environment variables:
   - `VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXX`
   - `RAZORPAY_KEY_ID=rzp_live_XXXXXXX`
   - `RAZORPAY_KEY_SECRET=live_secret_here`
5. Redeploy backend and frontend

### **Important Notes:**
- **Never commit** Razorpay secrets to Git
- **Test thoroughly** in test mode before going live
- **Monitor transactions** in Razorpay dashboard
- **Handle payment failures** gracefully in production

---

## Current Setup Status

### ✅ **Completed:**
- Razorpay SDK installed (frontend & backend)
- RazorpayContext created
- Dual payment UI in CreateJob
- Backend handlers for order creation and verification
- Database schema updated with `paymentMethod` field

### 🔧 **Remaining:**
1. Add `VITE_RAZORPAY_KEY_ID` to Vercel
2. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to Render
3. Test payment flow
4. (Optional) Configure webhooks for production

---

## Payment Comparison

| Feature | Razorpay | Solana |
|---------|----------|--------|
| **Amount** | ₹50 INR | 0.0001 SOL (~$0.02) |
| **Accepts** | UPI, Cards, Wallets | Crypto only |
| **Setup** | Need Razorpay account | Need Phantom wallet |
| **Users** | Indian, Traditional | Global, Crypto users |
| **Speed** | Instant | ~400ms |
| **Default** | ✅ Yes | No |

---

## Support

**Razorpay Docs:** https://razorpay.com/docs/  
**Test Credentials:** https://razorpay.com/docs/payments/test-card-upi-details/  
**Dashboard:** https://dashboard.razorpay.com/

**Need Help?**
- Razorpay Support: support@razorpay.com
- Integration Issues: Check backend logs in Render dashboard
