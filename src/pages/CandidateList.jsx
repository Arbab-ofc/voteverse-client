import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaIdBadge, FaAddressCard, FaVoteYea } from "react-icons/fa";
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
        const res = await axios.get(`https://voteverse-server.onrender.com/api/elections/id/${electionId}`, {
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

  const handleVote = async (electionId, candidateId) => {
    console.log("Casting vote for candidate:", candidateId);
    console.log("Election ID:", electionId);

    const toastId = toast.loading("Casting your vote...");

    try {
      const res = await axios.post(
        "https://voteverse-server.onrender.com/api/votes/vote-candidate",
        { electionId, candidateId },
        { withCredentials: true }
      );

      console.log("Vote response:", res.data);

      toast.update(toastId, {
        render: res.data.message || "Vote casted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "You have already voted or an error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Loading...
      </div>
    );
  }

  
  const isBeforeStart = election?.startDate
    ? new Date() < new Date(election.startDate)
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 pt-28 p-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Candidates for "{election?.title}"
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-gray-900 rounded-xl p-5 shadow-lg hover:shadow-white/20 transition-all hover:scale-[1.01]"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaIdBadge className="text-lg md:hidden" />
                <p className="hidden md:block font-medium">Candidate ID:</p>
                <span className="text-sm break-all">{candidate._id}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaAddressCard className="text-lg md:hidden" />
                <p className="hidden md:block font-medium">Election ID:</p>
                <span className="text-sm break-all">{electionId}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-lg md:hidden" />
                <p className="hidden md:block font-medium">Name:</p>
                <span className="text-base">{candidate.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-lg md:hidden" />
                <p className="hidden md:block font-medium">Bio:</p>
                <span className="text-base">{candidate.bio}</span>
              </div>
            </div>

            <button
              onClick={() => handleVote(electionId, candidate._id)}
              disabled={isBeforeStart} 
              className={`mt-5 w-full py-2 rounded-lg font-bold shadow-md transition-all duration-300 glow ${
                isBeforeStart
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800 hover:shadow-blue-500/50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <FaVoteYea className="text-white md:hidden" />
                <span className="hidden md:inline">
                  {isBeforeStart ? "Voting not started" : "Vote"}
                </span>
              </span>
            </button>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default CandidateList;
