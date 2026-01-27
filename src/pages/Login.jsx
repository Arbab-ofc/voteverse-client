import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { fetchUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return toast.error("Email and password are required");

    try {
      const res = await axios.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      const message = res?.data?.message;

      if (message === "User not found") return toast.error("User not found");
      if (message === "Email not verified") return toast.error("Please verify your email before logging in");
      if (message === "Invalid credentials") return toast.error("Invalid credentials");
      if (message === "Token generation failed") return toast.error("Token generation failed");

      await fetchUser();
      toast.success("Login successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-20 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Welcome back</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Sign in to VoteVerse</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            Continue to your elections dashboard and manage voting in seconds.
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
            Tip: Keep your account secure and avoid sharing your credentials.
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <h2 className="font-display text-2xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vv-ink-2)]/60" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-11 pr-4 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vv-ink-2)]/60" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-11 pr-12 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--vv-ink-2)]/60"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--vv-ink)] py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-sm text-[var(--vv-ink-2)]/70">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="font-semibold text-[var(--vv-ink)] hover:underline">
                Register here
              </a>
            </p>
            <p className="mt-2">
              Forgot your password?{" "}
              <a href="/forgot-password" className="font-semibold text-[var(--vv-ink)] hover:underline">
                Reset here
              </a>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
