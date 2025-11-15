import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import About from './About';
import Features from './Features';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel'; // ✅ import AdminPanel

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="relative">
        {/* Navbar always visible */}
        <Navbar 
          onSignupClick={() => setShowSignup(true)} 
          onLoginClick={() => setShowLogin(true)} 
        />

        {/* Main Content */}
        <main className={`transition duration-300 ${(showSignup || showLogin) ? 'blur-sm' : ''}`}>
          <Routes>
            {/* Homepage */}
            <Route
              path="/"
              element={
                <section className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-6 py-12">
                  <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6">Invest in Crypto with Confidence</h1>
                    <p className="text-lg mb-8 max-w-3xl mx-auto">
                      CryptoInsider is your gateway to the future of finance. Whether you're new to crypto or a seasoned investor,
                      our platform offers secure, profitable, and user-friendly tools to grow your digital wealth.
                    </p> 

                    {/* 🎁 Promo Badge */}
                    <p className="inline-block bg-yellow-400 text-purple-900 font-bold px-4 py-2 rounded-full mb-6">
                      🎁 Sign up and get up to $500 in Crypto
                    </p>

                    <button
                      onClick={() => setShowSignup(true)}
                      className="bg-white text-purple-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
                    >
                      Get Started
                    </button>
                  </div>

                  {/* Features Section */}
                  <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">🔒 Secure Wallet</h3>
                      <p className="text-sm">
                        Your assets are protected with industry-grade encryption and multi-factor authentication.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">📈 Smart Investing</h3>
                      <p className="text-sm">
                        Access real-time market data, automated strategies, and expert insights to maximize returns.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">💡 Beginner Friendly</h3>
                      <p className="text-sm">
                        Simple onboarding, educational resources, and intuitive tools designed for first-time investors.
                      </p>
                    </div>
                  </div>

                  {/* ✅ Weekly Earnings Potential Section */}
                  <div className="mt-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Your Weekly Earnings Potential</h2>
                    <p className="text-md mb-6">
                      With CryptoInsider, investors typically earn 
                      <span className="font-semibold text-yellow-300"> 5–10% weekly returns</span> depending on their portfolio size.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Example: $1,000 Investment</h3>
                        <p className="text-sm">Potential weekly earnings: $50 – $100</p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Example: $100,000 Investment</h3>
                        <p className="text-sm">Potential weekly earnings: $5,000 – $10,000</p>
                      </div>
                    </div>
                  </div>

                  {/* Why CryptoInsider Section */}
                  <div className="mt-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Why Choose CryptoInsider?</h2>
                    <p className="text-md mb-6">
                      We believe crypto should be accessible to everyone. Our platform combines cutting-edge technology with
                      human-centered design to help you invest smarter, faster, and safer.
                    </p>
                    <ul className="space-y-2 text-left text-sm max-w-xl mx-auto">
                      <li>✅ Zero hidden fees</li>
                      <li>✅ 24/7 customer support</li>
                      <li>✅ Instant deposits and withdrawals</li>
                      <li>✅ Trusted by thousands of investors worldwide</li>
                    </ul>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
                    >
                      Create Your Free Account
                    </button>
                  </div>
                </section>
              }
            />

            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} /> {/* ✅ new admin route */}
          </Routes>
        </main>

        {/* Modals */}
        {showSignup && (
          <SignupModal
            onClose={() => setShowSignup(false)}
            onShowLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
    </Router>
  );
}

export default App;