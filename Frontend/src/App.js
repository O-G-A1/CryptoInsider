import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
  const location = useLocation();

  // ✅ Only show navbar if NOT on dashboard
  const showNavbar = location.pathname !== "/dashboard";

  return (
    <div className={showNavbar ? "relative pt-16" : "relative"}>
      {showNavbar && (
        <Navbar
          onSignupClick={() => setShowSignup(true)}
          onLoginClick={() => setShowLogin(true)}
        />
      )}

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
              <section className="min-h-screen bg-gray-900 text-white px-6 py-12">
                <div className="max-w-5xl mx-auto text-center">
                  <h1 className="text-3xl font-bold mb-4 text-yellow-200">
                    Copytrade & Reclaim Assets with Ease
                  </h1>
                  <p className="text-lg mb-8 max-w-3xl mx-auto">
                    ChainHub is your gateway to modern investing. Whether you’re
                    exploring copytrading for the first time or seeking to
                    recover lost assets, our platform delivers secure,
                    intuitive, and profitable tools to help you grow and protect
                    your wealth. With ChainHub, confidence isn’t just a promise
                    — it’s built into every trade and recovery step.
                  </p>
                </div>
                {/* 🎁 Promo Badge */}
                <div className="flex flex-col items-center space-y-4 mt-8">
                  <p className="inline-block bg-yellow-200 text-center text-gray-900 font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
                    🎁 Earn up to $400 in crypto when you make your first
                    deposit.
                  </p>

                  <button
                    onClick={() => setShowSignup(true)}
                    className="bg-white text-gray-900 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
                  >
                    Get Started
                  </button>
                </div>
                {/* Features Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                  <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">🔒 Secure Wallet</h3>
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
                  <h2 className="text-2xl font-bold mb-4">
                    Your Weekly Earnings Potential
                  </h2>
                  <p className="text-md mb-6">
                    With ChainHub, investors typically earn
                    <span className="font-semibold text-yellow-200">
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
                        Potential weekly earnings: $150 – $280
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">
                        Example: $100,000 Investment
                      </h3>
                      <p className="text-sm">
                        Potential weekly earnings: $3500 – $28,000
                      </p>
                    </div>
                  </div>
                </div>
                {/* Testimonials Section */}
                <div className="mt-20 text-center max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">Reviews</h2>
                  {/* Carousel container */}
                  <div className="overflow-hidden relative">
                    <div className="flex animate-slide">
                      {/* Testimonial 1 */}
                      <div className="min-w-full px-6">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                          <p className="text-lg italic mb-4">
                            "ChainHub helped me grow my $1,000 investment into
                            $5,000 in just a few months!"
                          </p>
                          <div className="text-yellow-200 mb-2">★★★★★</div>
                          <span className="font-semibold text-yellow-200">
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
                          <div className="text-yellow-200 mb-2">★★★★☆</div>
                          <span className="font-semibold text-yellow-200">
                            — David O.
                          </span>
                        </div>
                      </div>

                      {/* Testimonial 3 */}
                      <div className="min-w-full px-6">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                          <p className="text-lg italic mb-4">
                            "I love the weekly returns. ChainHub has changed my
                            financial future."
                          </p>
                          <div className="text-yellow-200 mb-2">★★★★★</div>
                          <span className="font-semibold text-yellow-200">
                            — Maria L.
                          </span>
                        </div>
                      </div>

                      {/* Testimonial 4 */}
                      <div className="min-w-full px-6">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                          <p className="text-lg italic mb-4">
                            "Customer support is amazing — they helped me every
                            step of the way."
                          </p>
                          <div className="text-yellow-200 mb-2">★★★★★</div>
                          <span className="font-semibold text-yellow-200">
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
                          <div className="text-yellow-200 mb-2">★★★★☆</div>
                          <span className="font-semibold text-yellow-200">
                            — Anita R.
                          </span>
                        </div>
                      </div>

                      {/* Testimonial 6 */}
                      <div className="min-w-full px-6">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                          <p className="text-lg italic mb-4">
                            "ChainHub gave me confidence to invest in crypto for
                            the first time."
                          </p>
                          <div className="text-yellow-200 mb-2">★★★★★</div>
                          <span className="font-semibold text-yellow-200">
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
                          <div className="text-yellow-200 mb-2">★★★★★</div>
                          <span className="font-semibold text-yellow-200">
                            — Lola S.
                          </span>
                        </div>
                      </div>

                      {/* Testimonial 8 */}
                      <div className="min-w-full px-6">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
                          <p className="text-lg italic mb-4">
                            "Secure, transparent, and profitable — ChainHub is
                            the real deal."
                          </p>
                          <div className="text-yellow-200 mb-2">★★★★☆</div>
                          <span className="font-semibold text-yellow-200">
                            — Ahmed B.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Wealth Growth Section */}
                <div className="text-gray-200 py-16 px-6 mt-8">
                  <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-2 text-yellow-200">
                      Wealth Growth Made Simple
                    </h2>
                    <span className="animate-underline"></span>
                    <p className="text-xl leading-relaxed text-gray-200 mt-6 mb-12 max-w-2xl mx-auto">
                      When you sign up, ChainHub takes care of the complex
                      trading process for you. Here’s how we make wealth growth
                      simple and stress‑free:
                    </p>

                    {/* Practical Points */}
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-200">
                          🤖 Automated Strategies
                        </h3>
                        <p className="text-sm leading-relaxed">
                          Our smart algorithms monitor the market 24/7 and
                          automatically adjust your portfolio to maximize growth
                          without you lifting a finger.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-200">
                          📊 Transparent Growth Tracking
                        </h3>
                        <p className="text-sm leading-relaxed">
                          See your wealth increase in real time with clear
                          dashboards that show exactly how your money is working
                          for you.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-200">
                          🎁 Sign‑Up Bonuses
                        </h3>
                        <p className="text-sm leading-relaxed">
                          Get instant rewards when you join, giving you a head
                          start on your wealth‑building journey.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-200">
                          🛡️ Built‑In Protection
                        </h3>
                        <p className="text-sm leading-relaxed">
                          Your funds are safeguarded with industry‑grade
                          security and automatic risk controls, so you can grow
                          wealth with peace of mind.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-200">
                          🌍 Global Access
                        </h3>
                        <p className="text-sm leading-relaxed">
                          ChainHub opens the door to profitable opportunities
                          worldwide — all managed seamlessly on your behalf.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-200">
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
                      className="mt-12 bg-indigo-400 text-white text-base px-5 py-5 rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                      Start Growing Your Wealth Today
                    </button>
                  </div>
                </div>{" "}
                {/* Why Choose ChainHub Section */}
                <div className="mt-8 max-w-5xl text-center mx-auto px-6">
                  <h2 className="text-2xl text-center text-indigo-400 mb-6 relative inline-block">
                    Why Choose ChainHub?
                    <span className="animate-underline"></span>
                  </h2>

                  <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">
                    We believe crypto should be accessible to everyone. Our
                    platform combines cutting-edge technology with
                    human-centered design to help you invest smarter, faster,
                    and safer.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Feature Card */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        ✅ Zero Hidden Fees
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Transparent pricing so you always know what you’re
                        paying.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        ✅ 24/7 Support
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Our team is available anytime to help you with your
                        investments.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        ✅ Instant Transactions
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Fast deposits and withdrawals so your money is always in
                        motion.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        ✅ Trusted Worldwide
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Thousands of investors rely on ChainHub for secure
                        crypto trading.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            }
          />

          {/* Other Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/withdrawal-pending" element={<WithdrawalPending />} />
          <Route path="/admin" element={<AdminPanel />} />
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

      <footer className="bg-gray-900 text-center text-sm text-yellow-200 font-bold py-8">
        <p>© 2026 ChainHub Technologies Ltd</p>
      </footer>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
