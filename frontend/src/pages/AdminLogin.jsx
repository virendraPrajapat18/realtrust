import React, { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.username, form.password);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-blue-100"
      >
        <div className="flex justify-center mb-5">
          <FaUserShield className="text-blue-600" size={42} />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-700">
          Admin Login
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your credentials to access the dashboard
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 mb-4 rounded text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="Username"
          className="w-full mb-4 p-3 border border-blue-200 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full mb-4 p-3 border border-blue-200 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
