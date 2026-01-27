import React, { useState } from "react";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        "/api/users/change-password",
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
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Security</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Update your password</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            Keep your account protected with a strong password that you don’t reuse anywhere else.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
              <Shield className="mt-1 h-4 w-4 text-[var(--vv-ember)]" />
              <div>
                <p className="font-semibold text-[var(--vv-ink)]">Strong password tips</p>
                <p className="text-xs text-[var(--vv-ink-2)]/70">
                  Use 12+ characters, mix symbols, and avoid personal details.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
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

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
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
      </div>

      <ToastContainer position="top-right" autoClose={1500} hideProgressBar theme="colored" />
    </div>
  );
};

export default ChangePassword;
