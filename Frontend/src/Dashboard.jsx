import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch latest user data from backend without redirecting
  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data.user);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setUser(null); // Don't redirect; show unauthorized UI
    } finally {
      setLoading(false);
    }
  };

  // Always fetch user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  const handleLogoutClick = () => setShowConfirm(true);

  const confirmLogout = () => {
    setLoggingOut(true);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const cancelLogout = () => setShowConfirm(false);
  const handleDeposit = () => setShowDeposit(true);

  const handleWithdraw = () => {
    if (user?.balance > 0) {
      alert("Withdraw flow goes here!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl text-red-600">
        Unauthorized. Please log in.
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const weeklyEarnings = user.balance * 0.05;

  return (
    <div className="min-h-screen bg-gray-100 p-6 px-4">
      <header className="bg-indigo-700 text-white p-5 rounded-lg shadow-md mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-lg">Welcome back, {user.name} 👋</p>
          {lastUpdated && (
            <p className="text-sm text-gray-200 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={fetchUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
          <button
            onClick={handleLogoutClick}
            disabled={loggingOut}
            className={`px-4 py-2 rounded-md font-medium transition ${
              loggingOut
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-red-600 hover:bg-red-100"
            }`}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Confirmation Box */}
      {showConfirm && !loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Summary */}
      <section className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600 font-medium">Portfolio Value</h2>
          <p className="text-3xl font-bold text-indigo-700 mt-1">
            {formatCurrency(user.balance + weeklyEarnings + 233)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600 font-medium">Available Balance</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {formatCurrency(user.balance)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600 font-medium">
            Estimated Weekly Earnings
          </h2>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {formatCurrency(weeklyEarnings)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on 5% weekly return
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Actions</h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleDeposit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            disabled={user.balance <= 0}
            className={`px-6 py-2 rounded transition ${
              user.balance <= 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Withdraw
          </button>
        </div>
      </section>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
            <button
              onClick={() => setShowDeposit(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Deposit Crypto
            </h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  USDT (TRC20)
                </h3>
                <p className="text-sm text-gray-600 break-all mt-2">
                  TU9PJJ9NcVvnVBfgjFPPMpwRfgb6jCfr8e
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">BTC</h3>
                <p className="text-sm text-gray-600 break-all mt-2">
                  1LkqGh7maYsvVhUzNdZA9ovJzd8fgLeRr1
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-500">
              Please send only the correct coin to each address.
            </p>
          </div>
        </div>
      )}

      {/* Transactions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        {user.transactions && user.transactions.length > 0 ? (
          <ul className="space-y-2">
            {user.transactions.map((tx, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{tx.type}</span>
                <span className="text-gray-600">
                  {formatCurrency(tx.amount)}
                </span>
                <span className="text-gray-500">{tx.date}</span>
                <span
                  className={`${
                    tx.status === "completed"
                      ? "text-green-600"
                      : tx.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No transactions yet</p>
        )}
      </section>
    </div>
  );
}
