import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useRazorpay } from '../contexts/RazorpayContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    jobType: 'Full-time',
    salary: '',
    skills: '',
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // default to Razorpay

  const { wallet, connected, payPlatformFee } = useWallet();
  const { initiatePayment: razorpayPay } = useRazorpay();
  const { user } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const PLATFORM_FEE = import.meta.env.VITE_PLATFORM_FEE || '0.0001';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user || user.role !== 'recruiter') {
      setError('Only recruiters can post jobs. Please register as a recruiter.');
      return;
    }

    // Check wallet connection only for Solana
    if (paymentMethod === 'solana' && !connected) {
      setError('Please connect your Phantom wallet first');
      return;
    }

    setPaymentStep(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      let paymentResult;

      // Process payment based on selected method
      if (paymentMethod === 'razorpay') {
        paymentResult = await razorpayPay();
      } else {
        paymentResult = await payPlatformFee();
      }
      
      if (!paymentResult.success) {
        setError(`Payment failed: ${paymentResult.error}`);
        setLoading(false);
        return;
      }

      // Create job posting
      const jobData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        paymentMethod: paymentMethod,
        paymentSignature: paymentMethod === 'razorpay' ? paymentResult.paymentId : paymentResult.signature,
        walletAddress: paymentMethod === 'solana' ? wallet : undefined
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/jobs`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        navigate('/my-jobs');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
            <p className="text-gray-600">
              {!paymentStep 
                ? 'Fill in the details about the position you\'re hiring for'
                : `Confirm payment of ${PLATFORM_FEE} SOL to publish your job`
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!paymentStep ? (
            /* Job Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g. Senior Full Stack Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g. Remote, New York, USA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range *
                </label>
                <input
                  type="text"
                  name="salary"
                  required
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g. $80,000 - $120,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills (comma-separated) *
                </label>
                <input
                  type="text"
                  name="skills"
                  required
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g. React, Node.js, MongoDB, TypeScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  rows="4"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="List any specific requirements, qualifications, or experience needed..."
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payment Method *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Razorpay Option */}
                  <div
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === 'razorpay'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Razorpay</h4>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="w-4 h-4 text-primary-600"
                      />
                    </div>
                    <p className="text-2xl font-bold text-primary-600 mb-1">₹50 INR</p>
                    <p className="text-sm text-gray-600">UPI, Cards, Wallets</p>
                  </div>

                  {/* Solana Option */}
                  <div
                    onClick={() => setPaymentMethod('solana')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === 'solana'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Solana</h4>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'solana'}
                        onChange={() => setPaymentMethod('solana')}
                        className="w-4 h-4 text-primary-600"
                      />
                    </div>
                    <p className="text-2xl font-bold text-primary-600 mb-1">{PLATFORM_FEE} SOL</p>
                    <p className="text-sm text-gray-600">Phantom Wallet</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/jobs')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          ) : (
            /* Payment Confirmation */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Payment</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Platform Fee:</span>
                  <span className="font-semibold">
                    {paymentMethod === 'razorpay' ? '₹50 INR' : `${PLATFORM_FEE} SOL`}
                  </span>
                </div>
                {paymentMethod === 'solana' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Wallet:</span>
                    <span className="font-mono text-sm">{wallet?.slice(0, 8)}...{wallet?.slice(-6)}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">
                {paymentMethod === 'razorpay' 
                  ? 'Click below to open Razorpay checkout and complete payment'
                  : 'Click below to pay via Phantom wallet and publish your job listing'
                }
              </p>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setPaymentStep(false)}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    paymentMethod === 'razorpay' ? 'Pay ₹50 & Publish' : `Pay ${PLATFORM_FEE} SOL & Publish`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
