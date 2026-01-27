import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Users, ClipboardList, Trash2, BadgeCheck, Crown, Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const AdminPortal = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [elections, setElections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [actionKey, setActionKey] = useState("");

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

  useEffect(() => {
    if (!user?.isAdmin) return;
    const loadAdminData = async () => {
      try {
        setLoadingData(true);
        const [userRes, electionRes, messageRes] = await Promise.all([
          axios.get("/api/admin/users", { withCredentials: true }),
          axios.get("/api/admin/elections", { withCredentials: true }),
          axios.get("/api/admin/contact-messages", { withCredentials: true }),
        ]);
        setUsers(userRes.data.users || []);
        setElections(electionRes.data.elections || []);
        setMessages(messageRes.data.messages || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoadingData(false);
      }
    };

    loadAdminData();
  }, [user]);

  const handleVerify = async (userId) => {
    try {
      setActionKey(`verify-${userId}`);
      const res = await axios.patch(`/api/admin/users/${userId}/verify`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((item) => (item._id === userId ? res.data.user : item)));
      toast.success("User verified");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify user");
    } finally {
      setActionKey("");
    }
  };

  const handlePromote = async (userId) => {
    try {
      setActionKey(`promote-${userId}`);
      const res = await axios.patch(`/api/admin/users/${userId}/promote`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((item) => (item._id === userId ? res.data.user : item)));
      toast.success("User promoted to admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to promote user");
    } finally {
      setActionKey("");
    }
  };

  const handleDeleteElection = async (electionId) => {
    try {
      setActionKey(`delete-${electionId}`);
      await axios.delete(`/api/admin/elections/${electionId}`, { withCredentials: true });
      setElections((prev) => prev.filter((item) => item._id !== electionId));
      toast.success("Election deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete election");
    } finally {
      setActionKey("");
    }
  };

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

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">Users</h2>
                  <p className="text-sm text-[var(--vv-ink-2)]/70">
                    Verify accounts and promote admins.
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold text-[var(--vv-ink-2)]/70">
                {users.length} users
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {loadingData && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  Loading users...
                </div>
              )}
              {!loadingData && users.length === 0 && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  No users found.
                </div>
              )}
              {users.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--vv-ink)]">{item.name}</p>
                    <p className="text-xs text-[var(--vv-ink-2)]/70">{item.email}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em]">
                      <span className={`rounded-full px-3 py-1 ${item.isVerified ? "bg-white text-[var(--vv-ink)]" : "bg-white/70 text-[var(--vv-ink-2)]"}`}>
                        {item.isVerified ? "Verified" : "Unverified"}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${item.isAdmin ? "bg-[var(--vv-ink)] text-white" : "bg-white text-[var(--vv-ink-2)]"}`}>
                        {item.isAdmin ? "Admin" : "User"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleVerify(item._id)}
                      disabled={item.isVerified || actionKey === `verify-${item._id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] disabled:opacity-50"
                    >
                      <BadgeCheck className="h-4 w-4" />
                      Verify
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePromote(item._id)}
                      disabled={item.isAdmin || actionKey === `promote-${item._id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                    >
                      <Crown className="h-4 w-4" />
                      Promote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-white">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">Elections</h2>
                  <p className="text-sm text-[var(--vv-ink-2)]/70">
                    Review and remove elections.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/create-election"
                  className="rounded-full bg-[var(--vv-ink)] px-4 py-2 text-xs font-semibold text-white"
                >
                  Add election
                </Link>
                <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-2 text-xs font-semibold text-[var(--vv-ink-2)]/70">
                  {elections.length} elections
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {loadingData && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  Loading elections...
                </div>
              )}
              {!loadingData && elections.length === 0 && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  No elections found.
                </div>
              )}
              {elections.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--vv-ink)]">{item.title}</p>
                    <p className="text-xs text-[var(--vv-ink-2)]/70">
                      {item.candidates?.length || 0} candidates • Created by {item.createdBy?.name || "Unknown"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteElection(item._id)}
                    disabled={actionKey === `delete-${item._id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] hover:bg-black/5 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">Contact messages</h2>
                  <p className="text-sm text-[var(--vv-ink-2)]/70">
                    Review inbound messages.
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold text-[var(--vv-ink-2)]/70">
                {messages.length} messages
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {loadingData && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  Loading messages...
                </div>
              )}
              {!loadingData && messages.length === 0 && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  No contact messages.
                </div>
              )}
              {messages.map((item) => (
                <div key={item._id} className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--vv-ink)]">{item.name}</p>
                      <p className="text-xs text-[var(--vv-ink-2)]/70">{item.email}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/60">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[var(--vv-ink-2)]/80">{item.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default AdminPortal;
