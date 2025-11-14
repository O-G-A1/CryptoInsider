import React, { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [result, setResult] = useState(null); // ✅ to show updated user info

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/admin/update-balance`,
  {
    email,
    amount: Number(amount),
    type
  }
);

      setResult(res.data.user); // ✅ store updated user info
      alert(res.data.message || "Balance updated successfully!");
    } catch (err) {
      console.error("AdminPanel error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Unknown error";
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
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Update Balance
        </button>
      </form>

      {/* ✅ Show result after update */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Updated User Info</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Balance:</strong> ${result.balance.toFixed(2)}</p>
          <h4 className="mt-4 font-semibold">Recent Transactions:</h4>
          <ul className="list-disc pl-5 text-sm">
            {result.transactions.map((tx, index) => (
              <li key={index}>
                {tx.date} — {tx.type} ${tx.amount} ({tx.status})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}