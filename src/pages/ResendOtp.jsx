import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaSyncAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ResendOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/v2/users/resend-otp",
        { email },
        { withCredentials: true }
      );

      if (res.data.message) {
        toast.success(res.data.message || "OTP sent successfully");
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 2000);
      } else {
        toast.error(res.data?.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-20 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Resend OTP</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Need a fresh verification code?</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            Enter your email and we’ll send a new OTP so you can verify quickly.
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
            Tip: Use the same email you registered with.
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <h2 className="font-display text-2xl font-semibold">Generate OTP</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vv-ink-2)]/60" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-11 pr-4 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full bg-[var(--vv-ink)] py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Generate OTP"}
              <FaSyncAlt className={`ml-2 inline-block ${loading ? "animate-spin" : "hidden"}`} />
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

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ResendOtp;
