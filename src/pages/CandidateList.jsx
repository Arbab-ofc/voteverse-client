import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaVoteYea } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const CandidateList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const electionId = state?.electionId;

  const [candidates, setCandidates] = useState([]);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!electionId) {
      toast.error("Election ID missing.");
      return navigate("/dashboard");
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(`/api/elections/id/${electionId}`, {
          withCredentials: true,
        });
        setElection(res.data.election);
        setCandidates(res.data.election.candidates || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch election.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  const handleVote = async (selectedElectionId, candidateId) => {
    const toastId = toast.loading("Casting your vote...");

    try {
      const res = await axios.post(
        "/api/votes/vote-candidate",
        { electionId: selectedElectionId, candidateId },
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Candidate</p>
                  <h3 className="font-display mt-2 text-lg font-semibold text-[var(--vv-ink)]">
                    {candidate.name}
                  </h3>
                </div>
                <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] p-2 text-[var(--vv-ink)]">
                  <FaUser />
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
                {candidate.bio || "No bio provided."}
              </p>
              <button
                onClick={() => handleVote(electionId, candidate._id)}
                disabled={isBeforeStart}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isBeforeStart
                    ? "cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50"
                    : "bg-[var(--vv-ink)] text-white shadow-lg shadow-black/20 hover:-translate-y-0.5"
                }`}
              >
                <FaVoteYea /> {isBeforeStart ? "Voting not started" : "Cast vote"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default CandidateList;
