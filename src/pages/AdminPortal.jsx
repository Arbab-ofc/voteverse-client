import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, ClipboardList, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminPortal = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading...
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <div className="flex items-center gap-3 text-[var(--vv-ember)]">
            <Shield className="h-6 w-6" />
            <p className="text-xs uppercase tracking-[0.2em]">Admin only</p>
          </div>
          <h1 className="font-display mt-4 text-3xl font-semibold">Access denied</h1>
          <p className="mt-3 text-sm text-[var(--vv-ink-2)]/70">
            This portal is available to admin accounts only.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--vv-ink)] px-5 py-2 text-xs font-semibold text-white"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const tiles = [
    {
      title: "User oversight",
      description: "Monitor verified users and account activity.",
      icon: Users,
    },
    {
      title: "Election review",
      description: "Audit active elections and outcomes.",
      icon: ClipboardList,
    },
    {
      title: "System settings",
      description: "Control platform-wide configurations.",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Admin portal</p>
            <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
              Control center
            </h1>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/75">
              Keep elections compliant, transparent, and secure.
            </p>
          </div>
          <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink-2)]/70">
            Logged in as admin
          </span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-[10px] font-semibold text-[var(--vv-ink-2)]/70">
                    Coming soon
                  </span>
                </div>
                <h2 className="font-display mt-4 text-xl font-semibold">{tile.title}</h2>
                <p className="mt-2 text-sm text-[var(--vv-ink-2)]/70">
                  {tile.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
