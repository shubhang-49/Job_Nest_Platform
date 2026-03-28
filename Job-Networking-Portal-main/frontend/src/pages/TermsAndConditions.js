import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 12, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using JobNest ("the Platform"), you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. User Accounts</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Registration</h3>
              <p>
                Users must register as either a <strong>Recruiter</strong> or <strong>Job Seeker (Candidate)</strong>. 
                You must provide accurate and complete information during registration.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Account Security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all 
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Services Provided</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 For Recruiters</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Post job listings by paying a platform fee of ₹50 INR or 0.0001 SOL per job posting</li>
                <li>View and manage applications received for posted jobs</li>
                <li>Access applicant profiles and resumes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.2 For Job Seekers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browse and apply to job listings free of charge</li>
                <li>Create and manage professional profiles</li>
                <li>Track application status</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Payment Terms</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Platform Fees</h3>
              <p>
                Recruiters must pay a non-refundable platform fee of <strong>₹50 INR</strong> (via Razorpay) or 
                <strong> 0.0001 SOL</strong> (via Solana blockchain) for each job posting.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 Payment Methods</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Razorpay:</strong> UPI, Credit/Debit Cards, Net Banking, Wallets</li>
                <li><strong>Solana:</strong> Phantom Wallet (cryptocurrency)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3 Free Services</h3>
              <p>
                Job seekers can apply to unlimited jobs at no cost.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Prohibited Activities</h2>
              <p>Users must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Post fake, misleading, or fraudulent job listings</li>
                <li>Use the platform for illegal or unauthorized purposes</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to bypass payment systems</li>
                <li>Scrape or collect data from the platform without permission</li>
                <li>Post jobs containing discriminatory content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Content Ownership</h2>
              <p>
                Users retain ownership of their posted content (job listings, profiles, applications). 
                By posting content, you grant JobNest a non-exclusive license to display and distribute 
                this content on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Liability Disclaimer</h2>
              <p>
                JobNest acts as a platform connecting recruiters and job seekers. We do not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Guarantee job placements or hiring outcomes</li>
                <li>Verify the authenticity of all job postings or user profiles</li>
                <li>Take responsibility for employment contracts between recruiters and candidates</li>
                <li>Guarantee platform uptime or availability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Termination</h2>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms and Conditions 
                without prior notice or refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We may update these Terms and Conditions from time to time. Continued use of the platform 
                after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of India. Any disputes shall be 
                subject to the exclusive jurisdiction of courts in India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
              <p>
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:support@jobnest.com" className="text-primary-600 hover:underline">support@jobnest.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
