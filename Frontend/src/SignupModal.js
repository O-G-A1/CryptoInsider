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
    // ✅ Call backend signup route using env variable
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/signup`,
      form
    );

    // ✅ Add a short delay before showing success message
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000); // 2 seconds delay
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.message || err.message));
    setLoading(false);
  }
};

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Account Created!</h2>
          <p className="mb-6 text-gray-700">
            Congratulations {form.name}, your account has been created successfully.
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
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onShowLogin();
            }}
            className="text-indigo-600 font-medium hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}