import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const RazorpayContext = createContext(null);

export const useRazorpay = () => {
  const context = useContext(RazorpayContext);
  if (!context) {
    throw new Error('useRazorpay must be used within a RazorpayProvider');
  }
  return context;
};

export const RazorpayProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const initiatePayment = async () => {
    setLoading(true);
    try {
      // Create order on backend
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/api/payments/razorpay/create-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Open Razorpay checkout
      return new Promise((resolve, reject) => {
        const options = {
          key: RAZORPAY_KEY,
          amount: data.amount,
          currency: data.currency,
          name: 'JobNest',
          description: 'Job Posting Platform Fee',
          order_id: data.orderId,
          handler: async function (response) {
            try {
              // Verify payment on backend
              const verifyResponse = await axios.post(
                `${API_URL}/api/payments/razorpay/verify`,
                {
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (verifyResponse.data.success) {
                resolve({
                  success: true,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                });
              } else {
                reject({ success: false, error: 'Payment verification failed' });
              }
            } catch (error) {
              reject({
                success: false,
                error: error.response?.data?.error || 'Payment verification failed',
              });
            }
          },
          prefill: {
            name: '',
            email: '',
          },
          theme: {
            color: '#7C3AED',
          },
          modal: {
            ondismiss: function () {
              reject({ success: false, error: 'Payment cancelled by user' });
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (error) {
      console.error('Razorpay error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to initiate payment',
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    initiatePayment,
    loading,
  };

  return <RazorpayContext.Provider value={value}>{children}</RazorpayContext.Provider>;
};
