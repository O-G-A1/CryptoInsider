import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import About from "./About";
import Features from "./Features";
import Dashboard from "./Dashboard";
import WithdrawalPending from "./WithdrawalPending";
import AdminPanel from "./AdminPanel"; // ✅ import AdminPanel

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  <Route path="/withdrawal-pending" element={<WithdrawalPending />} />;
  return (
    <Router>
      <div className="relative">
        {/* Navbar always visible */}
        <Navbar
          onSignupClick={() => setShowSignup(true)}
          onLoginClick={() => setShowLogin(true)}
        />

        {/* Main Content */}
        <main
          className={`transition duration-300 ${
            showSignup || showLogin ? "blur-sm" : ""
          }`}
        >
          <Routes>
            {/* Homepage */}
            <Route
              path="/"
              element={
                <section className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-6 py-12">
                  <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4 text-yellow-400">
                      Invest in Crypto with Confidence
                    </h1>
                    <p className="text-lg mb-8 max-w-3xl mx-auto">
                      CryptoInsider is your gateway to the future of finance.
                      Whether you're new to crypto or a seasoned investor, our
                      platform offers secure, profitable, and user-friendly
                      tools to grow your digital wealth.
                    </p>
                  </div>
                  {/* 🎁 Promo Badge */}
                  <div className="flex flex-col items-center space-y-4 mt-8">
                    <p className="inline-block bg-yellow-400 text-purple-900 font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
                      🎁 Sign up and get $500 in Crypto
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
                      <h3 className="text-xl font-bold mb-2">
                        🔒 Secure Wallet
                      </h3>
                      <p className="text-sm">
                        Your assets are protected with industry-grade encryption
                        and multi-factor authentication.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">
                        📈 Smart Investing
                      </h3>
                      <p className="text-sm">
                        Access real-time market data, automated strategies, and
                        expert insights to maximize returns.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">
                        💡 Beginner Friendly
                      </h3>
                      <p className="text-sm">
                        Simple onboarding, educational resources, and intuitive
                        tools designed for first-time investors.
                      </p>
                    </div>
                  </div>
                  {/* ✅ Weekly Earnings Potential Section */}
                  <div className="mt-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">
                      Your Weekly Earnings Potential
                    </h2>
                    <p className="text-md mb-6">
                      With CryptoInsider, investors typically earn
                      <span className="font-semibold text-yellow-300">
                        {" "}
                        5–10% weekly returns
                      </span>{" "}
                      depending on their portfolio size.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                          Example: $1,000 Investment
                        </h3>
                        <p className="text-sm">
                          Potential weekly earnings: $50 – $100
                        </p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                          Example: $100,000 Investment
                        </h3>
                        <p className="text-sm">
                          Potential weekly earnings: $5,000 – $10,000
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Testimonials Section */}
                  <div className="mt-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">User's Review</h2>

                    {/* Carousel container */}
                    <div className="overflow-hidden relative">
                      <div className="flex animate-slide">
                        {/* Testimonial 1 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "CryptoInsider helped me grow my $1,000 investment
                              into $5,000 in just a few months!"
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★★</div>
                            <span className="font-semibold text-yellow-300">
                              — Sarah K.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "The platform is beginner-friendly. I finally feel
                              confident investing in crypto."
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★☆</div>
                            <span className="font-semibold text-yellow-300">
                              — David O.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "I love the weekly returns. CryptoInsider has
                              changed my financial future."
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★★</div>
                            <span className="font-semibold text-yellow-300">
                              — Maria L.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 4 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "Customer support is amazing — they helped me
                              every step of the way."
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★★</div>
                            <span className="font-semibold text-yellow-300">
                              — James T.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 5 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "I withdrew profits instantly. No hidden fees!"
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★☆</div>
                            <span className="font-semibold text-yellow-300">
                              — Anita R.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 6 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "CryptoInsider gave me confidence to invest in
                              crypto for the first time."
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★★</div>
                            <span className="font-semibold text-yellow-300">
                              — Kelvin M.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 7 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "My portfolio grew faster than I expected. Highly
                              recommend!"
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★★</div>
                            <span className="font-semibold text-yellow-300">
                              — Lola S.
                            </span>
                          </div>
                        </div>

                        {/* Testimonial 8 */}
                        <div className="min-w-full px-6">
                          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                              "Secure, transparent, and profitable —
                              CryptoInsider is the real deal."
                            </p>
                            <div className="text-yellow-400 mb-2">★★★★☆</div>
                            <span className="font-semibold text-yellow-300">
                              — Ahmed B.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Wealth Growth Section */}
                  <div className="text-gray-200 py-16 px-6 mt-20">
                    <div className="max-w-5xl mx-auto text-center">
                      <h2 className="text-3xl font-bold mb-6 text-yellow-300">
                        How CryptoInsider Helps You Grow Your Wealth
                      </h2>
                      <p className="text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
                        When you sign up, CryptoInsider takes care of the
                        complex investing process for you. Here’s how we make
                        wealth growth simple and stress‑free:
                      </p>

                      {/* Practical Points */}
                      <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-yellow-300">
                            🤖 Automated Strategies
                          </h3>
                          <p className="text-sm leading-relaxed">
                            Our smart algorithms monitor the market 24/7 and
                            automatically adjust your portfolio to maximize
                            growth without you lifting a finger.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2 text-yellow-300">
                            📊 Transparent Growth Tracking
                          </h3>
                          <p className="text-sm leading-relaxed">
                            See your wealth increase in real time with clear
                            dashboards that show exactly how your money is
                            working for you.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2 text-yellow-300">
                            🎁 Sign‑Up Bonuses
                          </h3>
                          <p className="text-sm leading-relaxed">
                            Get instant rewards when you join, giving you a head
                            start on your wealth‑building journey.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2 text-yellow-300">
                            🛡️ Built‑In Protection
                          </h3>
                          <p className="text-sm leading-relaxed">
                            Your funds are safeguarded with industry‑grade
                            security and automatic risk controls, so you can
                            grow wealth with peace of mind.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2 text-yellow-300">
                            🌍 Global Access
                          </h3>
                          <p className="text-sm leading-relaxed">
                            CryptoInsider opens the door to profitable
                            opportunities worldwide — all managed seamlessly on
                            your behalf.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2 text-yellow-300">
                            🤝 Guided Support
                          </h3>
                          <p className="text-sm leading-relaxed">
                            Our team and community provide ongoing guidance, so
                            you always know your wealth is being handled by
                            experts.
                          </p>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <button
                        onClick={() => setShowSignup(true)}
                        className="mt-12 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
                      >
                        Start Growing Your Wealth Today
                      </button>
                    </div>
                  </div>{" "}
                  {/* Why CryptoInsider Section */}
                  <div className="mt-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">
                      Why Choose CryptoInsider?
                    </h2>
                    <p className="text-md mb-6">
                      We believe crypto should be accessible to everyone. Our
                      platform combines cutting-edge technology with
                      human-centered design to help you invest smarter, faster,
                      and safer.
                    </p>
                    <ul className="space-y-2 text-left text-sm max-w-xl mx-auto">
                      <li>✅ Zero hidden fees</li>
                      <li>✅ 24/7 customer support</li>
                      <li>✅ Instant deposits and withdrawals</li>
                      <li>✅ Trusted by thousands of investors worldwide</li>
                    </ul>
                  </div>
                </section>
              }
            />
            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />{" "}
            {/* ✅ new admin route */}
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
        <footer className="bg-gradient-to-br from-purple-900 to-indigo-900 text-center text-sm text-yellow-300 font-bold py-8">
          <p>© 2025 CryptoInsider Technologies Ltd</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
