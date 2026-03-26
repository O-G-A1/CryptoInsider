import React, { useState } from "react";
import axios from "axios";

export default function SignupModal({ onClose, onShowLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        form,
      );

      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md text-center border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">
            🎉 Account Created!
          </h2>
          <p className="mb-6 text-gray-300">
            Congratulations {form.name}, your account has been created
            successfully.
          </p>
          <button
            onClick={() => {
              onClose();
              onShowLogin();
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-3xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onShowLogin();
            }}
            className="text-indigo-400 font-medium hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
