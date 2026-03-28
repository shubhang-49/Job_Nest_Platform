import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 12, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">Not Applicable</h2>
              <p className="text-blue-800 mb-4">
                JobNest is a <strong>100% digital platform</strong>. We do not ship any physical products or materials.
              </p>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Key Information:</p>
                <ul className="text-blue-800 space-y-1">
                  <li>• <strong>Shipping Time:</strong> Not Applicable (Digital Service)</li>
                  <li>• <strong>Delivery Method:</strong> Instant online access</li>
                  <li>• <strong>Physical Products:</strong> None</li>
                </ul>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Digital Service Delivery</h2>
              <p>
                JobNest provides online services connecting recruiters and job seekers. All services are 
                delivered electronically through our web platform:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Job Postings:</strong> Published instantly online after payment confirmation</li>
                <li><strong>Applications:</strong> Submitted and received digitally through the platform</li>
                <li><strong>Notifications:</strong> Sent via email and in-platform alerts</li>
                <li><strong>Profile Access:</strong> Available immediately upon registration</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">No Physical Products</h2>
              <p>
                We do not manufacture, store, or ship any physical items. Our platform operates entirely online:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>No physical job postings or documents</li>
                <li>No printed materials or merchandise</li>
                <li>No shipping addresses required</li>
                <li>No delivery tracking or logistics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Instant Access</h2>
              <p>
                All services are available immediately:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">For Recruiters</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Job posts go live within seconds of payment</li>
                    <li>View applications in real-time</li>
                    <li>Access candidate profiles instantly</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">For Job Seekers</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Browse jobs immediately after signup</li>
                    <li>Apply to jobs with one click</li>
                    <li>Track application status online</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Geographic Availability</h2>
              <p>
                Since our services are digital, JobNest is accessible worldwide with an internet connection. 
                There are no geographic restrictions or shipping limitations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Questions?</h2>
              <p>
                If you have any questions about our digital services, please contact us:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:support@jobnest.com" className="text-primary-600 hover:underline">support@jobnest.com</a>
              </p>
            </section>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This shipping policy is provided to meet regulatory requirements. 
                As a digital-only platform, JobNest does not engage in any physical product shipping or delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
