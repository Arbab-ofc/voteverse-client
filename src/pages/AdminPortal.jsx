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
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingElections, setLoadingElections] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [actionKey, setActionKey] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userPages, setUserPages] = useState(1);
  const [userTotal, setUserTotal] = useState(0);
  const [electionSearch, setElectionSearch] = useState("");
  const [electionPage, setElectionPage] = useState(1);
  const [electionPages, setElectionPages] = useState(1);
  const [electionTotal, setElectionTotal] = useState(0);
  const [messageSearch, setMessageSearch] = useState("");
  const [messagePage, setMessagePage] = useState(1);
  const [messagePages, setMessagePages] = useState(1);
  const [messageTotal, setMessageTotal] = useState(0);
  const [confirmAction, setConfirmAction] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    if (!user?.isAdmin) return;
    const loadUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await axios.get("/api/v2/admin/users", {
          withCredentials: true,
          params: { page: userPage, limit: pageSize, search: userSearch || undefined },
        });
        setUsers(res.data.users || []);
        setUserPages(res.data.pages || 1);
        setUserTotal(res.data.total || 0);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, [user, userPage, userSearch]);

  useEffect(() => {
    if (!user?.isAdmin) return;
    const loadElections = async () => {
      try {
        setLoadingElections(true);
        const res = await axios.get("/api/v2/admin/elections", {
          withCredentials: true,
          params: { page: electionPage, limit: pageSize, search: electionSearch || undefined },
        });
        setElections(res.data.elections || []);
        setElectionPages(res.data.pages || 1);
        setElectionTotal(res.data.total || 0);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load elections");
      } finally {
        setLoadingElections(false);
      }
    };

    loadElections();
  }, [user, electionPage, electionSearch]);

  useEffect(() => {
    if (!user?.isAdmin) return;
    const loadMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await axios.get("/api/v2/admin/contact-messages", {
          withCredentials: true,
          params: { page: messagePage, limit: pageSize, search: messageSearch || undefined },
        });
        setMessages(res.data.messages || []);
        setMessagePages(res.data.pages || 1);
        setMessageTotal(res.data.total || 0);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [user, messagePage, messageSearch]);

  const handleVerify = async (userId) => {
    try {
      setActionKey(`verify-${userId}`);
      const res = await axios.patch(`/api/v2/admin/users/${userId}/verify`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((item) => (item._id === userId ? res.data.user : item)));
      toast.success(res?.data?.message || "User verified");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify user");
    } finally {
      setActionKey("");
    }
  };

  const handlePromote = async (userId) => {
    try {
      setActionKey(`promote-${userId}`);
      const res = await axios.patch(`/api/v2/admin/users/${userId}/promote`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((item) => (item._id === userId ? res.data.user : item)));
      toast.success(res?.data?.message || "User promoted to admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to promote user");
    } finally {
      setActionKey("");
    }
  };

  const handleDeleteElection = async (electionId) => {
    try {
      setActionKey(`delete-${electionId}`);
      const res = await axios.delete(`/api/v2/admin/elections/${electionId}`, { withCredentials: true });
      setElections((prev) => prev.filter((item) => item._id !== electionId));
      setElectionTotal((prev) => Math.max(prev - 1, 0));
      toast.success(res?.data?.message || "Election deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete election");
    } finally {
      setActionKey("");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setActionKey(`delete-user-${userId}`);
      const res = await axios.delete(`/api/v2/admin/users/${userId}`, { withCredentials: true });
      setUsers((prev) => prev.filter((item) => item._id !== userId));
      setUserTotal((prev) => Math.max(prev - 1, 0));
      toast.success(res?.data?.message || "User deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setActionKey("");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      setActionKey(`delete-message-${messageId}`);
      const res = await axios.delete(`/api/v2/admin/contact-messages/${messageId}`, { withCredentials: true });
      setMessages((prev) => prev.filter((item) => item._id !== messageId));
      setMessageTotal((prev) => Math.max(prev - 1, 0));
      toast.success(res?.data?.message || "Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    } finally {
      setActionKey("");
    }
  };

  const openConfirm = (type, id) => setConfirmAction({ type, id });
  const closeConfirm = () => setConfirmAction(null);
  const handleConfirm = () => {
    if (!confirmAction) return;
    const { type, id } = confirmAction;
    if (type === "user") handleDeleteUser(id);
    if (type === "election") handleDeleteElection(id);
    if (type === "message") handleDeleteMessage(id);
    setConfirmAction(null);
  };

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
        <div className="mx-auto max-w-3xl rounded-[28px] border-2 border-black/80 bg-white p-8 shadow-[12px_12px_0_#111827]">
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
            className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-black/80 bg-[var(--vv-ink)] px-5 py-2 text-xs font-semibold text-white shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

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
          <span className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink-2)]/70 shadow-[4px_4px_0_#111827]">
            Logged in as admin
          </span>
        </div>

        <div className="mt-10 space-y-8">
          <section className="rounded-[28px] border-2 border-black/80 bg-white p-6 shadow-[12px_12px_0_#111827]">
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
              <span className="rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold text-[var(--vv-ink-2)]/70 shadow-[4px_4px_0_#111827]">
                {userTotal} users
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  setUserPage(1);
                }}
                placeholder="Search users by name or email"
                className="w-full rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-2 text-sm shadow-[4px_4px_0_#111827] focus:border-[var(--vv-ink)] focus:outline-none md:max-w-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUserPage((prev) => Math.max(prev - 1, 1))}
                  disabled={userPage <= 1}
                  className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] shadow-[4px_4px_0_#111827] disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-xs font-semibold text-[var(--vv-ink-2)]/70">
                  Page {userPage} of {userPages}
                </span>
                <button
                  type="button"
                  onClick={() => setUserPage((prev) => Math.min(prev + 1, userPages))}
                  disabled={userPage >= userPages}
                  className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] shadow-[4px_4px_0_#111827] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {loadingUsers && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  Loading users...
                </div>
              )}
              {!loadingUsers && users.length === 0 && (
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
                    <button
                      type="button"
                      onClick={() => openConfirm("user", item._id)}
                      disabled={actionKey === `delete-user-${item._id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border-2 border-black/80 bg-white p-6 shadow-[12px_12px_0_#111827]">
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
                  className="rounded-full border-2 border-black/80 bg-[var(--vv-ink)] px-4 py-2 text-xs font-semibold text-white shadow-[4px_4px_0_#111827] transition hover:-translate-y-0.5"
                >
                  Add election
                </Link>
                <span className="rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-3 py-2 text-xs font-semibold text-[var(--vv-ink-2)]/70 shadow-[4px_4px_0_#111827]">
                  {electionTotal} elections
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                value={electionSearch}
                onChange={(e) => {
                  setElectionSearch(e.target.value);
                  setElectionPage(1);
                }}
                placeholder="Search elections by title"
                className="w-full rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-2 text-sm shadow-[4px_4px_0_#111827] focus:border-[var(--vv-ink)] focus:outline-none md:max-w-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setElectionPage((prev) => Math.max(prev - 1, 1))}
                  disabled={electionPage <= 1}
                  className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] shadow-[4px_4px_0_#111827] disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-xs font-semibold text-[var(--vv-ink-2)]/70">
                  Page {electionPage} of {electionPages}
                </span>
                <button
                  type="button"
                  onClick={() => setElectionPage((prev) => Math.min(prev + 1, electionPages))}
                  disabled={electionPage >= electionPages}
                  className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] shadow-[4px_4px_0_#111827] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {loadingElections && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  Loading elections...
                </div>
              )}
              {!loadingElections && elections.length === 0 && (
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
                    onClick={() => openConfirm("election", item._id)}
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

          <section className="rounded-[28px] border-2 border-black/80 bg-white p-6 shadow-[12px_12px_0_#111827]">
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
              <span className="rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold text-[var(--vv-ink-2)]/70 shadow-[4px_4px_0_#111827]">
                {messageTotal} messages
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                value={messageSearch}
                onChange={(e) => {
                  setMessageSearch(e.target.value);
                  setMessagePage(1);
                }}
                placeholder="Search messages"
                className="w-full rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-2 text-sm shadow-[4px_4px_0_#111827] focus:border-[var(--vv-ink)] focus:outline-none md:max-w-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMessagePage((prev) => Math.max(prev - 1, 1))}
                  disabled={messagePage <= 1}
                  className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] shadow-[4px_4px_0_#111827] disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-xs font-semibold text-[var(--vv-ink-2)]/70">
                  Page {messagePage} of {messagePages}
                </span>
                <button
                  type="button"
                  onClick={() => setMessagePage((prev) => Math.min(prev + 1, messagePages))}
                  disabled={messagePage >= messagePages}
                  className="rounded-full border-2 border-black/80 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] shadow-[4px_4px_0_#111827] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {loadingMessages && (
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[var(--vv-ink-2)]/70">
                  Loading messages...
                </div>
              )}
              {!loadingMessages && messages.length === 0 && (
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
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/60">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => openConfirm("message", item._id)}
                        disabled={actionKey === `delete-message-${item._id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-semibold text-[var(--vv-ink)] disabled:opacity-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[var(--vv-ink-2)]/80">{item.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Confirm delete</p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-[var(--vv-ink)]">
              Are you sure?
            </h3>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/70">
              {confirmAction.type === "user" && "This will permanently remove the user."}
              {confirmAction.type === "election" && "This will permanently remove the election."}
              {confirmAction.type === "message" && "This will permanently remove the message."}
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeConfirm}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-full border-2 border-black/80 bg-[var(--vv-ink)] px-4 py-2 text-sm font-semibold text-white shadow-[4px_4px_0_#111827] transition hover:-translate-y-0.5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default AdminPortal;
