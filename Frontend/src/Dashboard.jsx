// Replacement for dashboard
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useCryptoPrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin,ethereum,tether,monero,litecoin",
              vs_currencies: "usd",
              include_24hr_change: true,
            },
          },
        );
        setPrices(res.data);
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return prices;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const prices = useCryptoPrices();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

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
        },
      );

      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-300 bg-gray-900">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl text-red-400 bg-gray-900 p-4">
        Unauthorized. Please log in or sign up.
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const portfolioValue = user.balance;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => {
            setLoggingOut(true);
            localStorage.removeItem("authToken");
            navigate("/");
          }}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      {/* Portfolio Summary */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-gray-300 font-medium">Portfolio Value</h2>
        <p className="text-3xl font-bold text-indigo-400 mt-1">
          {formatCurrency(portfolioValue)}
        </p>
        <p className="text-green-400 mt-1">+0.00% (1 day)</p>
      </section>

      {/* Wallet Section with Live Prices */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Cryptocurrency</h2>
        {Object.entries(prices).map(([coin, data]) => (
          <div
            key={coin}
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-2"
          >
            <span className="font-semibold">{coin.toUpperCase()}</span>
            <span>${data.usd.toFixed(2)}</span>
            <span
              className={
                data.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"
              }
            >
              {data.usd_24h_change.toFixed(2)}%
            </span>
          </div>
        ))}
      </section>

      {/* Actions */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => setShowDeposit(true)}
            className="px-6 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Deposit
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            disabled={user.balance <= 0}
            className={`px-6 py-2 rounded ${
              user.balance <= 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Withdraw
          </button>
        </div>
      </section>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
            <button
              onClick={() => setShowDeposit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-indigo-400">
              Deposit Crypto
            </h2>
            <p className="text-gray-300">Deposit addresses go here...</p>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
            <button
              onClick={() => setShowWithdraw(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-indigo-400">
              Withdraw Funds
            </h2>
            <p className="text-gray-300">Withdrawal form goes here...</p>
          </div>
        </div>
      )}
    </div>
  );
}
