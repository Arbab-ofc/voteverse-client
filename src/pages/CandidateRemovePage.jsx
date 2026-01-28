import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  FaUser,
  FaInfoCircle,
  FaIdBadge,
  FaCalendarAlt,
  FaTrashAlt,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const CandidateRemovePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  
  const electionId = state?.electionId;
  const electionTitle = state?.electionTitle;

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [candidateToRemove, setCandidateToRemove] = useState(null);

  useEffect(() => {
    if (!electionId) {
      toast.error("Election ID missing.");
      navigate("/dashboard");
      return;
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(
          `/api/v2/elections/id/${electionId}`,
          { withCredentials: true }
        );
        const election = res.data.election;
        setCandidates(election.candidates || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  
  const openRemoveModal = (candidate) => {
    setCandidateToRemove(candidate);
    setModalOpen(true);
  };

  
  const closeModal = () => {
    setModalOpen(false);
    setCandidateToRemove(null);
    navigate("/dashboard");
  };

  
  const confirmRemove = async () => {
    if (!candidateToRemove) return;

    try {
      const res = await axios.delete(
  `/api/v2/elections/${electionId}/candidates/${candidateToRemove._id}`,
  {
    data: { candidateId: candidateToRemove._id , electionId: electionId },
    withCredentials: true,
  }
);
      toast.success(res.data.message || "Candidate removed successfully.");

      
      setCandidates((prev) =>
        prev.filter((c) => c._id !== candidateToRemove._id)
        
      );

      setModalOpen(false);
      setCandidateToRemove(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to remove candidate."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-4 text-white pt-28">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Candidates of Election: <span className="text-blue-400">{electionTitle}</span>
      </h1>

      {candidates.length === 0 ? (
        <p className="text-center text-gray-400">No candidates found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-gray-900 rounded-xl p-5 shadow-lg transition-all hover:shadow-white/30 hover:scale-[1.03] relative"
              style={{ boxShadow: "0 0 10px #3b82f6" }}
            >
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaIdBadge className="text-lg md:hidden text-blue-400" />
                  <p className="hidden md:block font-semibold text-gray-300">
                    Candidate ID:
                  </p>
                  <span className="break-all">{candidate._id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaUser className="text-lg md:hidden text-green-400" />
                  <p className="hidden md:block font-semibold text-gray-300">
                    Name:
                  </p>
                  <span>{candidate.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-lg md:hidden text-yellow-400" />
                  <p className="hidden md:block font-semibold text-gray-300">
                    Description:
                  </p>
                  <span>{candidate.bio || "N/A"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaIdBadge className="text-lg md:hidden text-purple-400" />
                  <p className="hidden md:block font-semibold text-gray-300">
                    Election ID:
                  </p>
                  <span>{electionId}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-lg md:hidden text-pink-400" />
                  <p className="hidden md:block font-semibold text-gray-300">
                    Election Title:
                  </p>
                  <span>{electionTitle}</span>
                </div>
              </div>

              
              <button
                onClick={() => openRemoveModal(candidate)}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-800 text-white py-2 rounded-lg font-bold shadow-md hover:shadow-red-500/70 transition-all glow"
                aria-label={`Remove candidate ${candidate.name} from election`}
              >
                <FaTrashAlt className="md:hidden" />
                <span className="hidden md:inline">Remove from Election</span>
              </button>
            </div>
          ))}
        </div>
      )}

      
      {modalOpen && candidateToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 shadow-lg text-white">
            <h3 className="text-xl font-bold mb-4">
              Remove Candidate Confirmation
            </h3>
            <p className="mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold">{candidateToRemove.name}</span> from
              this election?
            </p>

            <div className="flex justify-end gap-4 flex-wrap">
              <button
                onClick={closeModal}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-gray-500/50 transition-all"
              >
                <FaTimesCircle className="md:hidden" />
                <span className="hidden md:inline">Cancel</span>
              </button>

              <button
                onClick={confirmRemove}
                className="flex items-center gap-2 bg-red-700 hover:bg-red-900 px-4 py-2 rounded-lg shadow-md hover:shadow-red-600/70 transition-all"
              >
                <FaCheckCircle className="md:hidden" />
                <span className="hidden md:inline">Sure</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default CandidateRemovePage;
