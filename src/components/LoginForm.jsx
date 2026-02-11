import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { validateLogin } from "../utils/validators";
import { adminLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ PAGE LOAD PE CHECK → ALREADY LOGGED IN?
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/admin/check`, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/dashboard"); // 🔥 already login
      })
      .catch(() => {
        // login page hi rahe
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateLogin(email, password);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const response = await adminLogin({ email, password });
      console.log("LOGIN RESPONSE 👉", response);

      toast.success(response.message || "Login successful");

      // ❌ token ko store karne ki zarurat nahi (cookie me hai)
      // console.log("🔐 JWT TOKEN:", response.token);

      // 🔥 LOGIN SUCCESS → DASHBOARD
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md animate-fadeIn">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Admin Login
          </h2>

          <p className="text-center text-sm text-gray-500 mb-8">
            Sign in to access admin dashboard
          </p>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin123@gmail.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Admin Panel. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
}