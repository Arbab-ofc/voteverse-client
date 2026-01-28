import React, { useState } from "react";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v2/users/change-password",
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Password changed successfully", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--vv-sand)] px-6 pb-24 pt-24 text-[var(--vv-ink)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-[var(--vv-sage)]/40 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-[var(--vv-ember)]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute left-10 top-28 hidden h-28 w-28 rotate-12 rounded-2xl border-2 border-black/80 bg-white/70 shadow-[8px_8px_0_#111827] lg:block" />
        <div className="absolute right-24 bottom-16 hidden h-20 w-20 -rotate-12 rounded-xl border-2 border-black/80 bg-white/80 shadow-[6px_6px_0_#111827] lg:block" />
      </div>

      <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative h-full rounded-[24px] border-2 border-black/80 bg-white p-8 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
            <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]">
              <span className="h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
              Security refresh
            </div>
            <h1 className="font-display mt-6 text-4xl font-semibold md:text-5xl">Update your password</h1>
            <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75 md:text-base">
              Keep your account protected with a strong password that you don’t reuse anywhere else.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-3 text-sm shadow-[6px_6px_0_#111827]">
                <Shield className="mt-1 h-4 w-4 text-[var(--vv-ember)]" />
                <div>
                  <p className="font-semibold text-[var(--vv-ink)]">Strong password tips</p>
                  <p className="text-xs text-[var(--vv-ink-2)]/70">
                    Use 12+ characters, mix symbols, and avoid personal details.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-3 text-sm shadow-[6px_6px_0_#111827]">
                <Lock className="mt-1 h-4 w-4 text-[var(--vv-ember)]" />
                <div>
                  <p className="font-semibold text-[var(--vv-ink)]">Password freshness</p>
                  <p className="text-xs text-[var(--vv-ink-2)]/70">
                    Change periodically and avoid reusing old passwords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="relative"
        >
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative h-full rounded-[24px] border-2 border-black/80 bg-white p-8 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
            <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Old password</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                <input
                  type={showOld ? "text" : "password"}
                  placeholder="Current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button type="button" onClick={() => setShowOld((prev) => !prev)}>
                  {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">New password</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button type="button" onClick={() => setShowNew((prev) => !prev)}>
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Confirm password</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button type="button" onClick={() => setShowConfirm((prev) => !prev)}>
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Change password
            </button>
          </form>
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-right" autoClose={1500} hideProgressBar theme="colored" />
    </div>
  );
};

export default ChangePassword;
