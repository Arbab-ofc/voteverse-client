import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Mail, Key, IdCard, UserCircle2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading profile...
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-lg font-semibold text-white">
                {initials}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Profile</p>
                <h1 className="font-display mt-2 text-3xl font-semibold md:text-4xl">
                  {user.name}
                </h1>
                <p className="mt-2 text-sm text-[var(--vv-ink-2)]/75">Account overview & security.</p>
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                user.isVerified
                  ? "bg-[var(--vv-sage)]/30 text-[var(--vv-ink)]"
                  : "bg-black/10 text-[var(--vv-ink-2)]/70"
              }`}
            >
              <CheckCircle className={user.isVerified ? "text-[var(--vv-ink)]" : "text-[var(--vv-ink-2)]/60"} />
              {user.isVerified ? "Verified" : "Not verified"}
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Email</p>
              <div className="mt-2 flex items-center gap-2 text-[15px] font-semibold">
                <Mail className="h-4 w-4 text-[var(--vv-ember)]" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Member since</p>
              <div className="mt-2 flex items-center gap-2 text-[15px] font-semibold">
                <Calendar className="h-4 w-4 text-[var(--vv-ember)]" />
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">User ID</p>
              <div className="mt-2 flex items-center gap-2 text-[15px] font-semibold">
                <IdCard className="h-4 w-4 text-[var(--vv-ember)]" />
                <span className="truncate">{user.id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Security</h2>
              <UserCircle2 className="h-5 w-5 text-[var(--vv-ember)]" />
            </div>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/75">
              Keep your account protected with a strong password.
            </p>
            <button
              onClick={() => navigate("/change-password")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              <Key className="h-4 w-4" />
              Change password
            </button>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--vv-ink)] p-6 text-white shadow-2xl shadow-black/10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-gold)]">Status</p>
            <p className="mt-4 text-sm text-white/75">
              {user.isVerified
                ? "Your account is verified and ready to vote."
                : "Verify your email to unlock voting and election management."}
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
              Need help? Reach out via the contact page.
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default MyProfile;
