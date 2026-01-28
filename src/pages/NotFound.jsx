import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCompass, FaHome, FaMapMarkedAlt } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--vv-sand)] px-6 pb-20 pt-20 text-[var(--vv-ink)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-[var(--vv-sage)]/40 blur-3xl" />
        <div className="absolute bottom-6 left-0 h-72 w-72 rounded-full bg-[var(--vv-ember)]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute left-10 top-28 hidden h-28 w-28 rotate-12 rounded-2xl border-2 border-black/80 bg-white/70 shadow-[8px_8px_0_#111827] lg:block" />
        <div className="absolute right-24 bottom-16 hidden h-20 w-20 -rotate-12 rounded-xl border-2 border-black/80 bg-white/80 shadow-[6px_6px_0_#111827] lg:block" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]">
            <span className="h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
            Detour detected
          </div>
          <h1 className="font-display mt-6 text-5xl font-semibold leading-tight md:text-6xl">404</h1>
          <p className="mt-3 text-xl font-semibold text-[var(--vv-ink)]">Page not found</p>
          <p className="mt-4 max-w-xl text-base text-[var(--vv-ink-2)]/80 md:text-lg">
            The route you followed doesn’t exist. Let’s get you back to the main flow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              <FaHome />
              Back to home
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-[var(--vv-ink)] transition hover:-translate-y-0.5"
            >
              <FaArrowLeft />
              Go back
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
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Lost route</p>
                <h2 className="font-display mt-2 text-2xl font-semibold">Suggested paths</h2>
              </div>
              <FaCompass className="text-2xl text-[var(--vv-ember)]" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                { label: "Explore elections", action: () => navigate("/elections") },
                { label: "Go to dashboard", action: () => navigate("/dashboard") },
                { label: "View profile", action: () => navigate("/my-profile") },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm font-semibold text-[var(--vv-ink)] transition hover:-translate-y-0.5"
                >
                  <span>{item.label}</span>
                  <FaMapMarkedAlt className="text-[var(--vv-ember)]" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border-2 border-black/80 bg-white px-5 py-4 text-xs uppercase tracking-[0.25em] text-[var(--vv-ink-2)]/70 shadow-[6px_6px_0_#111827]">
              You’re still inside VoteVerse \u2014 nothing is lost.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
