import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { RazorpayProvider } from './contexts/RazorpayContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobFeed from './pages/JobFeed';
import JobDetails from './pages/JobDetails';
import JobDetail from './pages/JobDetail';
import CreateJob from './pages/CreateJob';
import MyJobs from './pages/MyJobs';
import Applications from './pages/Applications';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';

// Components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <RazorpayProvider>
            <div className="App min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/profile/:id?" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/jobs" element={
                <PrivateRoute>
                  <JobFeed />
                </PrivateRoute>
              } />
              <Route path="/jobs/:id" element={
                <PrivateRoute>
                  <JobDetail />
                </PrivateRoute>
              } />
              <Route path="/job/:id" element={
                <PrivateRoute>
                  <JobDetail />
                </PrivateRoute>
              } />
              <Route path="/create-job" element={
                <PrivateRoute>
                  <CreateJob />
                </PrivateRoute>
              } />
              <Route path="/my-jobs" element={
                <PrivateRoute>
                  <MyJobs />
                </PrivateRoute>
              } />
              <Route path="/job/:jobId/applications" element={
                <PrivateRoute>
                  <Applications />
                </PrivateRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </div>
          </RazorpayProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
