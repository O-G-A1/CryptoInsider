import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Coin lists
const defaultCoins = [
  "bitcoin",
  "ethereum",
  "tether",
  "monero",
  "litecoin",
  "ripple",
  "cardano",
  "polkadot",
  "dogecoin",
  "solana",
];

const extendedCoins = [
  ...defaultCoins,
  "tron",
  "stellar",
  "vechain",
  "cosmos",
  "tezos",
  "aave",
  "uniswap",
  "chainlink",
  "algorand",
  "filecoin",
  "aptos",
  "near",
  "hedera",
  "fantom",
  "arbitrum",
  "optimism",
  "sui",
  "mina",
  "thorchain",
  "dash",
  "zilliqa",
  "waves",
  "iota",
  "neo",
  "kusama",
  "gala",
  "flow",
  "immutable-x",
  "render",
  "chiliz",
  "curve-dao-token",
  "maker",
  "compound",
  "yearn-finance",
  "balancer",
  "lido-dao",
  "rocket-pool",
  "frax",
  "pancakeswap",
  "1inch",
];

// ✅ Hook with toggle
function useCryptoPrices(showExtended = false) {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = showExtended ? extendedCoins : defaultCoins;
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: ids.join(","),
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
  }, [showExtended]);

  return prices;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showExtended, setShowExtended] = useState(false);
  const prices = useCryptoPrices(showExtended);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showCopytradeModal, setShowCopytradeModal] = useState(false);
  const [copytradeActive, setCopytradeActive] = useState(
    localStorage.getItem("copytradeActive") === "true",
  );
  const [copytradeStartDate, setCopytradeStartDate] = useState(
    localStorage.getItem("copytradeStartDate")
      ? new Date(localStorage.getItem("copytradeStartDate"))
      : null,
  );

  // ✅ Start copytrade (resume if already has a start date)
  const startCopytrade = () => {
    setCopytradeActive(true);
    if (!copytradeStartDate) {
      const today = new Date();
      setCopytradeStartDate(today);
      localStorage.setItem("copytradeStartDate", today.toISOString());
    }
    localStorage.setItem("copytradeActive", "true");
  };

  // ✅ Stop copytrade (pause only, keep start date)
  const stopCopytrade = () => {
    setCopytradeActive(false);
    localStorage.setItem("copytradeActive", "false");
    // Notice: we do NOT clear copytradeStartDate here
  };

  // ✅ Calculate days since start
  const daysSinceStart = copytradeStartDate
    ? Math.max(
        1,
        Math.floor(
          (Date.now() - copytradeStartDate.getTime()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  const devMode = false; // 🔑 flip to false when backend is ready

  const fetchUser = async () => {
    if (devMode) {
      setUser({ name: "Dev User", balance: 1200, createdAt: "2026-01-3" });
      setLoading(false);
      return;
    }

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
      console.error("Dashboard fetch error, kindly reload the page:", err);
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
  const daysSinceCreation = user?.createdAt
    ? Math.max(
        1,
        Math.floor(
          (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24),
        ),
      )
    : 1;

  const balance = typeof user?.balance === "number" ? user.balance : 0;

  const portfolioValueWithGrowth = balance * Math.pow(1.04, daysSinceCreation);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => setShowConfirm(true)} // 👈 open the confirmation modal
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      {/* Portfolio Summary */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-gray-300 font-medium">Total Assets</h2>
        <p className="text-3xl font-bold text-white mt-1">
          {formatCurrency(portfolioValueWithGrowth || 0)}
        </p>

        {copytradeActive && (
          <p className="text-green-400 text-xs mt-2">
            Copytrade in progress — Day {daysSinceStart} : +4% daily
          </p>
        )}

        {!copytradeActive && copytradeStartDate && (
          <p className="text-blue-400 text-xs mt-2">
            Copytrade paused — Day {daysSinceStart}
          </p>
        )}

        {/* Toggle button */}
        {copytradeActive ? (
          <button
            onClick={() => setShowCopytradeModal(true)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Stop Copytrade
          </button>
        ) : (
          <button
            onClick={() => {
              if (balance < 500) {
                alert("You don't have the required funds yet (minimum $500).");
                return;
              }
              setShowCopytradeModal(true);
            }}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Start Copytrade
          </button>
        )}
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

        {/* Toggle Button */}
        <button
          onClick={() => setShowExtended(!showExtended)}
          className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          {showExtended ? "Show less" : "Show more"}
        </button>
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
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-red-400">
              Confirm Logout
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  setLoggingOut(true);
                  localStorage.removeItem("authToken");
                  navigate("/");
                }}
                className="px-6 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showCopytradeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-white mb-4">
              {copytradeActive ? "Stop Copytrade?" : "Start Copytrade?"}
            </p>
            <div className="flex justify-center gap-4">
              {/* Yes button */}
              <button
                onClick={() => {
                  copytradeActive ? stopCopytrade() : startCopytrade();
                  setShowCopytradeModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Yes
              </button>

              {/* No button */}
              <button
                onClick={() => setShowCopytradeModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center relative 
                    max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setShowDeposit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl font-bold p-2 rounded-full hover:bg-gray-700"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-indigo-400">
              Deposit Crypto
            </h2>

            {/* Addresses */}
            <div className="space-y-4">
              {/* USDT (TRC20) */}
              <div className="p-4 rounded-lg bg-gray-700">
                <h3 className="text-lg font-semibold text-white">
                  USDT (TRC20)
                </h3>
                <p className="text-sm text-gray-300 break-all mt-2">
                  TS93LbTrDjVSB2i13DnAnr4VSx87cQVa6a
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "TS93LbTrDjVSB2i13DnAnr4VSx87cQVa6a",
                    );
                    alert("Address copied!");
                  }}
                  className="mt-2 w-full px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500"
                >
                  Copy
                </button>
              </div>

              {/* ETH (ERC20) */}
              <div className="p-4 rounded-lg bg-gray-700">
                <h3 className="text-lg font-semibold text-white">
                  ETH (ERC20)
                </h3>
                <p className="text-sm text-gray-300 break-all mt-2">
                  0x7a220042a8b1E30A9CE4f8ec61c410Eb757881fE
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "0x7a220042a8b1E30A9CE4f8ec61c410Eb757881fE",
                    );
                    alert("Address copied!");
                  }}
                  className="mt-2 w-full px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500"
                >
                  Copy
                </button>
              </div>

              {/* USDT (ERC20) */}
              <div className="p-4 rounded-lg bg-gray-700">
                <h3 className="text-lg font-semibold text-white">
                  USDT (ERC20)
                </h3>
                <p className="text-sm text-gray-300 break-all mt-2">
                  0x7a220042a8b1E30A9CE4f8ec61c410Eb757881fE
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "0x7a220042a8b1E30A9CE4f8ec61c410Eb757881fE",
                    );
                    alert("Address copied!");
                  }}
                  className="mt-2 w-full px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500"
                >
                  Copy
                </button>
              </div>

              {/* SOL */}
              <div className="p-4 rounded-lg bg-gray-700">
                <h3 className="text-lg font-semibold text-white">SOL</h3>
                <p className="text-sm text-gray-300 break-all mt-2">
                  JCfWUhzHu4XjXzTBdmnvsNsf1o7XJrdnxHQc1pyBsrtc
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "JCfWUhzHu4XjXzTBdmnvsNsf1o7XJrdnxHQc1pyBsrtc",
                    );
                    alert("Address copied!");
                  }}
                  className="mt-2 w-full px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500"
                >
                  Copy
                </button>
              </div>

              {/* BTC */}
              <div className="p-4 rounded-lg bg-gray-700">
                <h3 className="text-lg font-semibold text-white">BTC</h3>
                <p className="text-sm text-gray-300 break-all mt-2">
                  bc1qfavp9r7xu8xccp6jwqwdf3t3cw9m404yp2mv4r
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "bc1qfavp9r7xu8xccp6jwqwdf3t3cw9m404yp2mv4r",
                    );
                    alert("Address copied!");
                  }}
                  className="mt-2 w-full px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-xs text-gray-400">
              Please send only the correct coin to each address.
            </p>
          </div>
        </div>
      )}

      {/* // Withdraw Modal */}
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

            <div className="mb-4 text-left">
              <label className="block text-gray-300 font-medium mb-2">
                Select Method
              </label>
              <select
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              >
                <option value="">-- Choose --</option>
                <option value="usdt">USDT (TRC20)</option>
                <option value="btc">BTC</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div className="mb-4 text-left">
              <label className="block text-gray-300 font-medium mb-2">
                Amount
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <button
              onClick={() => {
                alert(
                  `Withdrawal confirmed!\nMethod: ${withdrawMethod}\nAmount: ${withdrawAmount}`,
                );
                setShowWithdraw(false);
                setWithdrawMethod("");
                setWithdrawAmount("");
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      )}
      {/* Transactions */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Recent Transactions
        </h2>
        {user.transactions && user.transactions.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {[...user.transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
              .map((tx, idx) => {
                const type = tx.type?.toLowerCase(); // normalize string
                const isWithdraw = type === "withdraw" || type === "send";
                const isDeposit = type === "deposit" || type === "receive";

                return (
                  <li
                    key={idx}
                    className="flex justify-between items-center py-3 text-sm"
                  >
                    {/* Transaction Direction */}
                    <div className="flex flex-col">
                      <span
                        className={`font-semibold ${
                          isWithdraw
                            ? "text-red-400"
                            : isDeposit
                              ? "text-green-400"
                              : "text-gray-400"
                        }`}
                      >
                        {isWithdraw
                          ? "Withdrawn"
                          : isDeposit
                            ? "Received"
                            : tx.type}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {isWithdraw
                          ? `To: ${tx.to || "0xAbC123..."}`
                          : `From: ${tx.from || "0xDeF456..."}`}
                      </span>
                    </div>

                    {/* Amount */}
                    <span
                      className={`font-medium ${
                        isWithdraw ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {isWithdraw ? `-${tx.amount}` : `+${tx.amount}`}
                    </span>

                    {/* Date */}
                    <span className="text-gray-400 text-xs">
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </li>
                );
              })}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No transactions yet</p>
        )}
      </section>
    </div>
  );
}
