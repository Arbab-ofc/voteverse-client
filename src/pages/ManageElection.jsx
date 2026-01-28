import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaTrash,
  FaPowerOff,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ManageElection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const electionId = state?.electionId;
  const electionTitle = state?.electionTitle;

  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [ending, setEnding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [formData, setFormData] = useState({ name: "", bio: "" });

  useEffect(() => {
    if (!electionId) {
      toast.error("Election ID missing.");
      navigate("/dashboard");
      return;
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(`/api/v2/elections/id/${electionId}`, {
          withCredentials: true,
        });
        setElection(res.data.election);
        setCandidates(res.data.election.candidates || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load election details.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.bio) {
      toast.error("Name and bio are required.");
      return;
    }
    setAdding(true);
    try {
      const res = await axios.post(
        "/api/v2/candidates/add-candidate",
        { ...formData, electionId },
        { withCredentials: true }
      );
      const newCandidate = res.data?.candidate;
      toast.success(res.data?.message || "Candidate added successfully.");
      if (newCandidate) {
        setCandidates((prev) => [newCandidate, ...prev]);
      } else {
        const refreshed = await axios.get(`/api/v2/elections/id/${electionId}`, {
          withCredentials: true,
        });
        setCandidates(refreshed.data.election.candidates || []);
      }
      setFormData({ name: "", bio: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add candidate.");
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveCandidate = async (candidateId) => {
    try {
      const res = await axios.delete(`/api/v2/elections/${electionId}/candidates/${candidateId}`, {
        data: { candidateId, electionId },
        withCredentials: true,
      });
      toast.success(res.data.message || "Candidate removed successfully.");
      setCandidates((prev) => prev.filter((c) => c._id !== candidateId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove candidate.");
    }
  };

  const handleEndElection = async () => {
    if (!electionId) return;
    setEnding(true);
    try {
      const res = await axios.put(`/api/v2/elections/end/${electionId}`, {}, { withCredentials: true });
      toast.success(res.data.message || "Election ended successfully.");
      setElection(res.data.election || election);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to end election.");
    } finally {
      setEnding(false);
    }
  };

  const handleDeleteElection = async () => {
    if (!electionId) return;
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/v2/elections/${electionId}`, { withCredentials: true });
      toast.success(res.data.message || "Election deleted successfully.");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete election.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading...
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Election not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Manage election</p>
            <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">{electionTitle || election.title}</h1>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/75">Add or remove candidates, end, or delete the election.</p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
              election.isActive
                ? "bg-[var(--vv-sage)]/30 text-[var(--vv-ink)]"
                : "bg-black/10 text-[var(--vv-ink-2)]/70"
            }`}
          >
            {election.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
            {election.isActive ? "Active" : "Ended"}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <h2 className="font-display text-2xl font-semibold">Add a candidate</h2>
            <p className="mt-2 text-sm text-[var(--vv-ink-2)]/70">Introduce a new contender to your ballot.</p>
            <form onSubmit={handleAddCandidate} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                  placeholder="Candidate name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                  placeholder="Short description"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={adding}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                <FaUserPlus />
                {adding ? "Adding..." : "Add candidate"}
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">Candidates</h2>
                <p className="text-sm text-[var(--vv-ink-2)]/70">Remove candidates if needed.</p>
              </div>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold">
                {candidates.length} total
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {candidates.length ? (
                candidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-[var(--vv-ink)]">{candidate.name}</p>
                      <p className="text-xs text-[var(--vv-ink-2)]/70">{candidate.bio || "No bio"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidate(candidate._id)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-3 py-2 text-xs font-semibold text-[var(--vv-ink)] hover:-translate-y-0.5"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 bg-[var(--vv-sand)] p-5 text-sm text-[var(--vv-ink-2)]/70">
                  No candidates yet. Add the first one.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">Election controls</h2>
              <p className="text-sm text-[var(--vv-ink-2)]/70">
                End the election when voting is complete, or delete it permanently.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--vv-ink-2)]/70">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[var(--vv-ember)]" /> Start: {formatDate(election.startDate)}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[var(--vv-ember)]" /> End: {formatDate(election.endDate)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleEndElection}
                disabled={!election.isActive || ending}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2 text-xs font-semibold text-[var(--vv-ink)] hover:-translate-y-0.5 disabled:opacity-50"
              >
                <FaPowerOff /> {ending ? "Ending..." : "End election"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-5 py-2 text-xs font-semibold text-white hover:-translate-y-0.5 disabled:opacity-50"
              >
                <FaTrash /> Delete election
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">Delete election?</h3>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/70">
              This action is permanent and cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteElection}
                disabled={deleting}
                className="flex-1 rounded-full bg-[var(--vv-ink)] px-4 py-2 text-sm font-semibold text-white"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default ManageElection;
