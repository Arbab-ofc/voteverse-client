import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Mail, Key, IdCard, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/v2/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load profile");
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
    <div className="relative min-h-screen overflow-hidden bg-[var(--vv-sand)] px-6 pb-24 pt-24 text-[var(--vv-ink)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-[var(--vv-sage)]/40 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-[var(--vv-ember)]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute left-10 top-28 hidden h-28 w-28 rotate-12 rounded-2xl border-2 border-black/80 bg-white/70 shadow-[8px_8px_0_#111827] lg:block" />
        <div className="absolute right-24 bottom-16 hidden h-20 w-20 -rotate-12 rounded-xl border-2 border-black/80 bg-white/80 shadow-[6px_6px_0_#111827] lg:block" />
      </div>

      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]">
              <span className="h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
              Personal account
            </div>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              {user.name}
            </h1>
            <p className="mt-4 max-w-xl text-base text-[var(--vv-ink-2)]/80 md:text-lg">
              Manage your profile, keep security tight, and stay ready for every vote.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
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
              <button
                onClick={() => navigate("/change-password")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
              >
                <Key className="h-4 w-4" />
                Change password
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative"
          >
            <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
            <div className="relative rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:p-6 sm:shadow-[12px_12px_0_#111827]">
              <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-lg font-semibold text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Profile</p>
                    <h2 className="font-display mt-2 text-2xl font-semibold">Account summary</h2>
                  </div>
                </div>
                <UserCircle2 className="h-5 w-5 text-[var(--vv-ember)]" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">User ID</p>
                  <div className="mt-2 flex items-center gap-2 text-[15px] font-semibold">
                    <IdCard className="h-4 w-4 text-[var(--vv-ember)]" />
                    <span className="truncate">{user.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827]"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Security</h2>
              <Key className="h-5 w-5 text-[var(--vv-ember)]" />
            </div>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/75">
              Keep your account protected with a strong password and verified access.
            </p>
            <div className="mt-5 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-xs text-[var(--vv-ink-2)]/70">
              Tip: Update your password regularly to keep your account safe.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-[24px] border-2 border-black/80 bg-[var(--vv-ink)] p-6 text-white shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827]"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-gold)]">Status</p>
            <p className="mt-4 text-sm text-white/75">
              {user.isVerified
                ? "Your account is verified and ready to vote."
                : "Verify your email to unlock voting and election management."}
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
              Need help? Reach out via the contact page.
            </div>
          </motion.div>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default MyProfile;
