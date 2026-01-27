import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      const res = await axios.post("/api/v2/users/forget", { email });

      toast.success(res.data.message || "OTP sent successfully");
      navigate("/verify-forget-otp", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while sending OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-20 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Reset access</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Forgot your password?</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            We’ll send a one-time password to verify it’s you. Then you can reset safely.
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
            Use the email you registered with to receive the OTP.
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-[var(--vv-ink-2)]/70">
            <FaKey className="text-[var(--vv-ember)]" />
            We never share your email with third parties.
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <h2 className="font-display text-2xl font-semibold">Send OTP</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vv-ink-2)]/60" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-11 pr-4 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--vv-ink)] py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Send OTP
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--vv-ink-2)]/70">
            Remembered your password?{" "}
            <a href="/login" className="font-semibold text-[var(--vv-ink)] hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ForgetPassword;
