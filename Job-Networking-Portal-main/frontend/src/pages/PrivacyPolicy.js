import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 12, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                JobNest ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Data:</strong> Name, email address, password (encrypted)</li>
                <li><strong>Profile Information:</strong> Bio, skills, LinkedIn URL, professional experience</li>
                <li><strong>User Role:</strong> Recruiter or Job Seeker designation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Payment Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Razorpay Payments:</strong> Processed by Razorpay; we store transaction IDs and payment status</li>
                <li><strong>Solana Payments:</strong> Wallet addresses and blockchain transaction signatures</li>
                <li>We do not store credit card details or banking information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3 Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Job postings and applications</li>
                <li>Search queries and browsing activity</li>
                <li>Device information, IP addresses, browser type</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our job portal services</li>
                <li>Process payments for job postings</li>
                <li>Match job seekers with relevant opportunities</li>
                <li>Send notifications about applications and job matches</li>
                <li>Improve platform features and user experience</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Information Sharing</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 With Recruiters</h3>
              <p>
                When you apply to a job, recruiters can view your profile information, skills, bio, 
                and application details (including cover letter).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 With Service Providers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Razorpay:</strong> Payment processing</li>
                <li><strong>MongoDB Atlas:</strong> Database hosting</li>
                <li><strong>Vercel & Render:</strong> Application hosting</li>
                <li><strong>Solana Blockchain:</strong> Cryptocurrency transactions (public blockchain)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3 We Do Not Sell Your Data</h3>
              <p>
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Security</h2>
              <p>We implement security measures including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Password encryption using bcrypt</li>
                <li>HTTPS/SSL encryption for data transmission</li>
                <li>Secure authentication with JWT tokens</li>
                <li>Regular security audits and updates</li>
                <li>Restricted database access</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee 
                absolute security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Export your data in a readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at: <a href="mailto:privacy@jobnest.com" className="text-primary-600 hover:underline">privacy@jobnest.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance user experience, remember preferences, 
                and analyze platform usage. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to 
                provide services. Payment transaction records are retained for 7 years for compliance purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
              <p>
                JobNest is not intended for users under 18 years of age. We do not knowingly collect 
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your residence. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes 
                via email or platform notification. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
              <p>
                For privacy-related questions or concerns:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:privacy@jobnest.com" className="text-primary-600 hover:underline">privacy@jobnest.com</a><br />
                General Support: <a href="mailto:support@jobnest.com" className="text-primary-600 hover:underline">support@jobnest.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
