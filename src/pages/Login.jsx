import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { signInWithGooglePopup } from "../lib/firebase";

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
        "/api/v2/users/login",
        { email, password },
        { withCredentials: true }
      );

      const message = res?.data?.message;

      if (message === "User not found") return toast.error("User not found");
      if (message === "Email not verified") return toast.error("Please verify your email before logging in");
      if (message === "Invalid credentials") return toast.error("Invalid credentials");
      if (message === "Token generation failed") return toast.error("Token generation failed");

      await fetchUser();
      toast.success(message || "Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      toast.error(apiMessage || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Connecting Google account...");
    try {
      const { idToken } = await signInWithGooglePopup();
      await axios.post(
        "/api/v2/users/google-login",
        { idToken },
        { withCredentials: true }
      );
      await fetchUser();
      toast.update(toastId, {
        render: "Logged in with Google",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Google login failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--vv-sand)] px-4 pb-20 pt-24 text-[var(--vv-ink)] sm:px-6 sm:pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-6 h-56 w-56 rounded-full bg-[var(--vv-sage)]/40 blur-3xl sm:right-10 sm:h-64 sm:w-64" />
        <div className="absolute bottom-8 left-0 h-60 w-60 rounded-full bg-[var(--vv-ember)]/25 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="absolute left-10 top-24 hidden h-28 w-28 rotate-12 rounded-2xl border-2 border-black/80 bg-white/70 shadow-[8px_8px_0_#111827] lg:block" />
        <div className="absolute right-24 bottom-16 hidden h-20 w-20 -rotate-12 rounded-xl border-2 border-black/80 bg-white/80 shadow-[6px_6px_0_#111827] lg:block" />
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative h-full">
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative h-full rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:p-8 sm:shadow-[14px_14px_0_#111827]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Welcome back</p>
            <h1 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">Sign in to VoteVerse</h1>
            <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
              Continue to your elections dashboard and manage voting in seconds.
            </p>
            <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
              Tip: Keep your account secure and avoid sharing your credentials.
            </div>
            <div className="mt-6 rounded-2xl border-2 border-black/80 bg-white px-5 py-4 shadow-[6px_6px_0_#111827]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">Why it matters</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--vv-ink-2)]/80">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
                  Verified sessions for confident voting.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-sage)]" />
                  Real-time updates and instant results.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-gold)]" />
                  Built for mobile, desktop, and kiosks.
                </li>
              </ul>
            </div>
        </div>
        </div>

        <div className="relative h-full">
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative h-full rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:p-8 sm:shadow-[14px_14px_0_#111827]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
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

          <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/60">
            <span className="h-px flex-1 bg-black/10" />
            Or
            <span className="h-px flex-1 bg-black/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 w-full rounded-full border-2 border-black/80 bg-white py-3 text-sm font-semibold text-[var(--vv-ink)] shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
          >
            Continue with Google
          </button>

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
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
