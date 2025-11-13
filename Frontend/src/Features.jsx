import React from 'react';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-700 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Secure Wallet</h3>
            <p>Keep your assets safe with our multi-layered security and encrypted storage.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Real-Time Analytics</h3>
            <p>Track market trends and your portfolio performance with live data dashboards.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Expert Insights</h3>
            <p>Get curated investment strategies and tips from seasoned crypto professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}