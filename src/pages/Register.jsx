import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { signInWithGooglePopup } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "user",
    adminSecret: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, accountType, adminSecret } = formData;

    if (name.length < 6) return toast.error("Name must be at least 6 characters long");
    if (password.length < 8) return toast.error("Password must be at least 8 characters long");
    if (accountType === "admin" && !adminSecret.trim()) {
      return toast.error("Admin secret is required for admin accounts");
    }

    try {
      const res = await axios.post(
        "/api/v2/users/register",
        { name, email, password, accountType, adminSecret },
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
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
        render: "Signed in with Google",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Google sign-in failed",
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
      <div className="mx-auto grid max-w-5xl items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative h-full rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:p-8 sm:shadow-[14px_14px_0_#111827]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Create account</p>
            <h1 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">Join VoteVerse today</h1>
            <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
              Start building secure elections and invite your voters in minutes.
            </p>
            <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
              Tip: Use a password you don’t use anywhere else.
            </div>
            <div className="mt-6 rounded-2xl border-2 border-black/80 bg-white px-5 py-4 shadow-[6px_6px_0_#111827]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">What you get</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--vv-ink-2)]/80">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
                  Private elections with access controls.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-sage)]" />
                  Clean candidate lists and audits.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-gold)]" />
                  Simple sharing and voter invites.
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border-2 border-black/80 bg-white px-5 py-4 shadow-[6px_6px_0_#111827]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">Setup preview</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--vv-ink-2)]/80">
                <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                  <span>Election status</span>
                  <span className="rounded-full border border-black/10 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--vv-ink)]">Draft</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                  <span>Security mode</span>
                  <span className="rounded-full border border-black/10 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--vv-ink)]">Protected</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                  <span>Voter access</span>
                  <span className="rounded-full border border-black/10 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--vv-ink)]">Invite</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative h-full rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:p-8 sm:shadow-[14px_14px_0_#111827]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
            <h2 className="font-display text-2xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/60">
                Account type
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["user", "admin"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, accountType: type })}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      formData.accountType === type
                        ? "bg-[var(--vv-ink)] text-white"
                        : "bg-white text-[var(--vv-ink)]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

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

            {formData.accountType === "admin" && (
              <div className="relative">
                <input
                  type="password"
                  name="adminSecret"
                  placeholder="Admin secret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] py-3 pl-4 pr-4 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full border-2 border-black/80 bg-[var(--vv-ink)] py-3 text-sm font-semibold text-white shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
            >
              Register
            </button>

            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/60">
              <span className="h-px flex-1 bg-black/10" />
              Or
              <span className="h-px flex-1 bg-black/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full rounded-full border-2 border-black/80 bg-white py-3 text-sm font-semibold text-[var(--vv-ink)] shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
            >
              Continue with Google
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
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
