import React, { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [status, setStatus] = useState("pending"); // ✅ withdrawal status
  const [reason, setReason] = useState(""); // ✅ failure reason
  const [withdrawalLimit, setWithdrawalLimit] = useState(""); // ✅ new: withdrawal limit
  const [result, setResult] = useState(null);

  // Handle deposit/withdraw
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/update-balance`,
        {
          email,
          amount: Number(amount),
          type,
          status: type === "withdraw" ? status : undefined,
          reason:
            type === "withdraw" && status === "failed" ? reason : undefined,
        }
      );

      setResult(res.data.user);
      alert(res.data.message || "Balance updated successfully!");
    } catch (err) {
      console.error("AdminPanel error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Unknown error";
      alert("Error: " + errorMsg);
    }
  };

  // Handle setting withdrawal limit
  const handleSetLimit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/set-withdrawal-limit`,
        {
          email,
          limit: Number(withdrawalLimit),
        }
      );
      setResult(res.data.user);
      alert(res.data.message || "Withdrawal limit updated!");
    } catch (err) {
      console.error("SetLimit error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Unknown error";
      alert("Error: " + errorMsg);
    }
  };

  // Handle transaction removal
  const handleRemove = async (txIndex) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/remove-transaction`,
        {
          email,
          index: txIndex,
        }
      );
      setResult(res.data.user);
      alert(res.data.message || "Transaction removed successfully!");
    } catch (err) {
      console.error("Remove error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Unknown error";
      alert("Error: " + errorMsg);
    }
  };

  // View user info
  const handleViewUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/get-user`,
        { email }
      );
      setResult(res.data.user);
      alert(res.data.message || "User fetched successfully!");
    } catch (err) {
      console.error("ViewUser error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Unknown error";
      alert("Error: " + errorMsg);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>

        {/* ✅ Show status + reason only for withdrawals */}
        {type === "withdraw" && (
          <>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>

            {status === "failed" && (
              <input
                type="text"
                placeholder="Reason for failure"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}
          </>
        )}

        {/* ✅ Withdrawal limit input + button */}
        <input
          type="number"
          placeholder="Withdrawal Limit"
          value={withdrawalLimit}
          onChange={(e) => setWithdrawalLimit(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={handleSetLimit}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Set Withdrawal Limit
        </button>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Update Balance
          </button>
          <button
            type="button"
            onClick={handleViewUser}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            View User
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">User Info</h3>
          <p>
            <strong>Name:</strong> {result.name}
          </p>
          <p>
            <strong>Email:</strong> {result.email}
          </p>
          <p>
            <strong>Balance:</strong> ${result.balance.toFixed(2)}
          </p>
          <p>
            <strong>Withdrawal Limit:</strong> ₦{result.withdrawalLimit}
          </p>
          <h4 className="mt-4 font-semibold">Transactions:</h4>
          <ul className="list-disc pl-5 text-sm">
            {result.transactions.map((tx, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {tx.date} — {tx.type} ${tx.amount} ({tx.status})
                  {tx.type === "withdraw" &&
                    tx.status === "failed" &&
                    tx.reason && (
                      <span className="text-red-600 ml-2">
                        Reason: {tx.reason}
                      </span>
                    )}
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  className="ml-4 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
