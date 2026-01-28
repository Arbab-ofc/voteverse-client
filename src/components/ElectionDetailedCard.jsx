import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCopy, FaVoteYea, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ElectionDetailedCard = () => {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const [election, setElection] = useState(null);

  useEffect(() => {
    if (!electionId) {
      toast.error("No election ID provided in URL");
      return;
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(`/api/v2/elections/id/${electionId}`, { withCredentials: true });
        if (res.data.success) {
          setElection(res.data.election);
        } else {
          toast.error(res.data.message || "Failed to fetch election details");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch election details");
        console.error(error);
      }
    };

    fetchElection();
  }, [electionId]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleVoteClick = () => {
    if (!electionId) {
      toast.error("Election ID missing");
      return;
    }
    navigate("/candidates", { state: { electionId } });
  };

  const handleCopyLink = () => {
    if (!electionId) {
      toast.error("Election ID missing");
      return;
    }
    const url = `${window.location.origin}/election-details/${electionId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Election link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  };

  if (!election) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading election details...
      </div>
    );
  }

  const { _id, title, startDate, endDate, candidates = [], isActive, isPasswordProtected } = election;

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Election details</p>
              <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">{title}</h1>
              <p className="mt-4 text-sm text-[var(--vv-ink-2)]/70">
                Review timing, status, and candidates before casting a vote.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                  isActive
                    ? "bg-[var(--vv-sage)]/30 text-[var(--vv-ink)]"
                    : "bg-black/10 text-[var(--vv-ink-2)]/70"
                }`}
              >
                {isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                {isActive ? "Active" : "Ended"}
              </span>
              {isPasswordProtected && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--vv-sand)] px-4 py-2 text-xs font-semibold text-[var(--vv-ink)]">
                  <FaLock /> Password required
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-4 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Start</p>
              <div className="mt-2 flex items-center gap-2 font-semibold">
                <FaCalendarAlt className="text-[var(--vv-ember)]" />
                {formatDate(startDate)}
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-4 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">End</p>
              <div className="mt-2 flex items-center gap-2 font-semibold">
                <FaCalendarAlt className="text-[var(--vv-ember)]" />
                {formatDate(endDate)}
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-4 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Election ID</p>
              <p className="mt-2 text-xs font-semibold break-all text-[var(--vv-ink)]">{_id}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Candidates</h2>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold">
                {candidates.length} total
              </span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {candidates.length ? (
                candidates.map((cand) => (
                  <div key={cand._id} className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
                    <p className="font-semibold text-[var(--vv-ink)]">{cand.name}</p>
                    <p className="mt-1 text-xs text-[var(--vv-ink-2)]/70">ID: {cand._id}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 bg-[var(--vv-sand)] p-4 text-sm text-[var(--vv-ink-2)]/70">
                  No candidates available.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleVoteClick}
              disabled={!isActive}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--vv-ink)] text-white shadow-lg shadow-black/20 hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50"
              }`}
            >
              <FaVoteYea /> Vote now
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-[var(--vv-ink)]"
            >
              <FaCopy /> Copy link
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ElectionDetailedCard;
