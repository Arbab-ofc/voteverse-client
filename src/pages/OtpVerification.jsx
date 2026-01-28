
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!email) {
      toast.error('Email is required');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      return toast.error('Email and OTP are required');
    }

    try {
      const response = await axios.post(
        '/api/v2/users/verify-otp',
        { email, otp },
        { withCredentials: true }
      );

      toast.success(response?.data?.message || 'OTP verified successfully. You can now login.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || 'OTP verification failed';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-20 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Verify email</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Confirm your account</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            Enter the 6-digit code sent to your email to activate your VoteVerse account.
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
            OTPs expire in 10 minutes. If it expired, request a new one.
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <h2 className="font-display text-2xl font-semibold">OTP Verification</h2>
          <p className="mt-2 text-sm text-[var(--vv-ink-2)]/70">
            We sent a code to {email || "your email"}.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              maxLength="6"
              autoFocus
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 px-4 text-sm tracking-[0.3em] text-center focus:border-[var(--vv-ink)] focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--vv-ink)] py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default OtpVerification;
