import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation and Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 12, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Overview</h2>
              <p>
                This Cancellation and Refund Policy applies to all payments made on JobNest for job posting services. 
                Please read this policy carefully before making any payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Service Description</h2>
              <p>
                JobNest charges a platform fee for recruiters to post job listings:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Razorpay Payment:</strong> ₹50 INR per job posting</li>
                <li><strong>Solana Payment:</strong> 0.0001 SOL per job posting</li>
              </ul>
              <p className="mt-4">
                This fee grants you the right to post one job listing on our platform, which will be visible 
                to all job seekers until you close or remove the listing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. No Refund Policy</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <p className="font-semibold text-yellow-800">Important Notice:</p>
                <p className="text-yellow-700 mt-2">
                  All payments made for job postings on JobNest are <strong>NON-REFUNDABLE</strong>.
                </p>
              </div>
              <p>
                Once payment is successfully processed and your job listing is published, the platform fee 
                cannot be refunded under any circumstances, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Change of mind after posting</li>
                <li>Early closure of job listing</li>
                <li>Insufficient or poor quality applications received</li>
                <li>Finding a candidate through other sources</li>
                <li>Errors or mistakes in job posting content (you can edit the post)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Exceptions - When Refunds May Be Issued</h2>
              <p>
                Refunds will only be considered in the following exceptional circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Technical Failures</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment was deducted but job posting was not created due to platform error</li>
                <li>Duplicate payment was charged for the same job posting</li>
                <li>Platform downtime prevented job posting from being visible for more than 48 hours</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 Payment Errors</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You were charged more than the stated platform fee</li>
                <li>Payment was processed multiple times for a single transaction</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3 Unauthorized Transactions</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fraudulent payment made without your authorization (subject to verification)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Refund Request Process</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-semibold text-yellow-900">Important Timelines:</p>
                <ul className="text-yellow-800 mt-2 space-y-1">
                  <li>• <strong>Request Deadline:</strong> Within 7 days of transaction</li>
                  <li>• <strong>Investigation:</strong> 3-5 business days</li>
                  <li>• <strong>Refund Processing:</strong> 9-15 business days (if approved)</li>
                </ul>
              </div>
              <p>
                If you believe you qualify for a refund under the exceptions listed above:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email us at <a href="mailto:payments@jobnest.com" className="text-primary-600 hover:underline">payments@jobnest.com</a> within <strong>7 days</strong> of the transaction</li>
                <li>Include the following information:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your registered email address</li>
                    <li>Payment transaction ID or receipt</li>
                    <li>Date and time of payment</li>
                    <li>Detailed explanation of the issue</li>
                    <li>Screenshots or evidence (if applicable)</li>
                  </ul>
                </li>
                <li>Our team will investigate within <strong>3-5 business days</strong></li>
                <li>If approved, refund will be processed within <strong>9-15 business days</strong> to the original payment method</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Refund Processing Time</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.1 Razorpay Payments</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Investigation Period:</strong> 3-5 business days</li>
                <li><strong>Refund Processing:</strong> 9-15 business days from approval</li>
                <li>Credit to your bank account/card may take additional 2-3 business days depending on your bank</li>
                <li><strong>Total Time:</strong> Up to 20 business days from request submission</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.2 Solana Cryptocurrency Payments</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Investigation Period:</strong> 3-5 business days</li>
                <li><strong>Refund Processing:</strong> 2-3 business days after approval</li>
                <li>Approved refunds sent to your wallet address</li>
                <li>Blockchain confirmation typically instantaneous</li>
                <li>Transaction fees may be deducted from refund amount</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cancellation Policy</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.1 Before Payment</h3>
              <p>
                You can cancel the job posting process at any time before completing payment. No charges will apply.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.2 After Payment</h3>
              <p>
                Once payment is completed, you can close or delete your job listing at any time, but the platform 
                fee will not be refunded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Job Seeker Services</h2>
              <p>
                Job seekers can apply to unlimited jobs at <strong>no cost</strong>. Since there are no payments 
                involved for candidates, no refund policy applies to job seeker services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Chargebacks</h2>
              <p>
                If you initiate a chargeback or payment dispute with your bank/payment provider without first 
                contacting us, we reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Suspend or terminate your account</li>
                <li>Remove all active job postings</li>
                <li>Block future access to the platform</li>
              </ul>
              <p className="mt-4">
                Please contact our support team first to resolve any payment disputes amicably.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact for Refund Inquiries</h2>
              <p>
                For all refund-related questions:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:payments@jobnest.com" className="text-primary-600 hover:underline">payments@jobnest.com</a><br />
                Subject Line: "Refund Request - [Your Transaction ID]"<br />
                Response Time: 24-48 hours on business days
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
              <p>
                We reserve the right to modify this Cancellation and Refund Policy at any time. 
                Changes will be effective immediately upon posting. Your continued use of the platform 
                after changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
