import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (name.length < 6) return toast.error("Name must be at least 6 characters long");
    if (password.length < 8) return toast.error("Password must be at least 8 characters long");

    try {
      await axios.post(
        "/api/users/register",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-20 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Create account</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Join VoteVerse today</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            Start building secure elections and invite your voters in minutes.
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
            Tip: Use a password you don’t use anywhere else.
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <h2 className="font-display text-2xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vv-ink-2)]/60" />
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-11 pr-4 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                required
              />
            </div>

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
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-4 pr-12 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
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
              Register
            </button>

            <button
              type="button"
              onClick={() => navigate("/resend-otp", { state: { email: formData.email } })}
              className="w-full rounded-full border border-black/10 bg-white py-3 text-sm font-semibold text-[var(--vv-ink)]"
            >
              Resend verification OTP
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--vv-ink-2)]/70">
            Already registered?{" "}
            <a href="/login" className="font-semibold text-[var(--vv-ink)] hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
