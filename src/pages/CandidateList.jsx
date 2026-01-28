import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaVoteYea, FaLock } from "react-icons/fa";
import socket from "../lib/socket";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const CandidateList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { electionId: paramElectionId } = useParams();
  const electionId = paramElectionId || state?.electionId;
  const { user } = useAuth();

  const [candidates, setCandidates] = useState([]);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votePassword, setVotePassword] = useState("");

  useEffect(() => {
    if (!electionId) {
      toast.error("Election ID missing.");
      return navigate("/dashboard");
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(`/api/v2/public/elections/id/${electionId}`);
        setElection(res.data.election);
        setCandidates(res.data.election.candidates || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch election.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  useEffect(() => {
    if (!electionId) return;

    socket.emit("join-election", electionId);

    const handleVoteUpdate = (payload) => {
      if (payload.electionId !== electionId) return;
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === payload.candidateId
            ? { ...candidate }
            : candidate
        )
      );
    };

    socket.on("vote-updated", handleVoteUpdate);

    return () => {
      socket.off("vote-updated", handleVoteUpdate);
    };
  }, [electionId]);

  const handleVote = async (selectedElectionId, candidateId) => {
    if (!user) {
      toast.error("Please login to vote");
      navigate("/login");
      return;
    }

    const toastId = toast.loading("Casting your vote...");

    try {
      const res = await axios.post(
        "/api/v2/votes/vote-candidate",
        { electionId: selectedElectionId, candidateId, votePassword },
        { withCredentials: true }
      );

      toast.update(toastId, {
        render: res.data.message || "Vote casted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "You have already voted or an error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading...
      </div>
    );
  }

  const isBeforeStart = election?.startDate ? new Date() < new Date(election.startDate) : false;

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Vote</p>
            <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
              {election?.title || "Election candidates"}
            </h1>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/75">
              Review each candidate and cast your vote confidently.
            </p>
          </div>
          {isBeforeStart && (
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--vv-ink-2)]/70">
              Voting opens soon
            </span>
          )}
        </div>

        {election?.isPasswordProtected && (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Voting password</p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
              <FaLock className="text-[var(--vv-ink-2)]/60" />
              <input
                type="password"
                value={votePassword}
                onChange={(e) => setVotePassword(e.target.value)}
                placeholder="Enter election password"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
            <p className="mt-3 text-xs text-[var(--vv-ink-2)]/70">
              Password is required to submit a vote.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate, index) => {
            const initial = candidate.name?.trim()?.[0]?.toUpperCase() || "C";
            return (
            <div
              key={candidate._id}
              className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5"
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--vv-ember)]/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-6 h-28 w-28 rounded-full bg-[var(--vv-ink)]/5 blur-2xl" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--vv-ember)]">
                  Candidate {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-[10px] font-semibold text-[var(--vv-ink-2)]/70">
                  {isBeforeStart ? "Upcoming" : "Live"}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vv-ink)] text-xl font-semibold text-white shadow-lg shadow-black/15">
                  {initial}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--vv-ink)]">
                    {candidate.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--vv-ink-2)]/70">
                    Civic leader
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[var(--vv-ink-2)]/80">
                {candidate.bio || "No bio provided."}
              </p>

              <div className="mt-6 flex items-center justify-between text-xs text-[var(--vv-ink-2)]/70">
                <span className="inline-flex items-center gap-2">
                  <FaUser className="text-[var(--vv-ember)]" />
                  Ready for votes
                </span>
                <span className="rounded-full border border-black/10 bg-white px-3 py-1 font-semibold text-[var(--vv-ink)]">
                  #{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <button
                onClick={() => handleVote(electionId, candidate._id)}
                disabled={!user || isBeforeStart || (election?.isPasswordProtected && !votePassword)}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !user || isBeforeStart || (election?.isPasswordProtected && !votePassword)
                    ? "cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50"
                    : "bg-[var(--vv-ink)] text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 group-hover:shadow-black/30"
                }`}
              >
                <FaVoteYea /> {!user ? "Login to vote" : isBeforeStart ? "Voting not started" : "Cast vote"}
              </button>
            </div>
          );
          })}
        </div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default CandidateList;
