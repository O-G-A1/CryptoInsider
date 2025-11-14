import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const signupSuccess = location.state?.signupSuccess;

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/login`,
  form
);

      // ✅ Save token to localStorage
      localStorage.setItem("authToken", res.data.token);

      // ✅ Navigate to dashboard (no need to pass user via state anymore)
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {signupSuccess && (
          <h2 className="text-green-600 text-center font-semibold mb-6">
            Account created successfully!
          </h2>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}