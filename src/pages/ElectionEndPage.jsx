import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  FaCalendarAlt,
  FaIdBadge,
  FaUser,
  FaStopCircle,
  FaPoll,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ElectionEndPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const electionId = state?.electionId;
  const electionTitle = state?.electionTitle;

  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    if (!electionId) {
      toast.error("Election ID missing.");
      navigate("/dashboard");
      return;
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(
          `https://voteverse-server.onrender.com/api/elections/id/${electionId}`,
          { withCredentials: true }
        );
        setElection(res.data.election);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load election details.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  const endElectionHandler = async () => {
    if (!electionId) return;

    setEnding(true);
    try {
      const res = await axios.put(
        `https://voteverse-server.onrender.com/api/elections/end/${electionId}`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message || "Election ended successfully.");
      setElection(res.data.election);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to end the election."
      );
    } finally {
      setEnding(false);
    }
  };

  const goToResults = () => {
    if (!election || election.isActive) return;
    navigate("/election-results", {
      state: { electionId: election._id, electionTitle: election.title },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Election not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-4 text-white pt-28 flex justify-center">
      <div
        className="bg-gray-900 rounded-xl p-6 max-w-lg w-full shadow-lg transition-transform hover:scale-[1.03] hover:shadow-white/30 glow"
        style={{ boxShadow: "0 0 15px #3b82f6" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Election Details
        </h1>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaIdBadge className="text-lg md:hidden text-blue-400" />
            <p className="hidden md:block font-semibold text-gray-300 w-36">
              Election ID:
            </p>
            <span className="break-all">{election._id}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaUser className="text-lg md:hidden text-green-400" />
            <p className="hidden md:block font-semibold text-gray-300 w-36">
              Title:
            </p>
            <span>{election.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-lg md:hidden text-yellow-400" />
            <p className="hidden md:block font-semibold text-gray-300 w-36">
              Start Date:
            </p>
            <span>
              {new Date(election.startDate).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-lg md:hidden text-pink-400" />
            <p className="hidden md:block font-semibold text-gray-300 w-36">
              End Date:
            </p>
            <span>
              {election.endDate
                ? new Date(election.endDate).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Not ended yet"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaUser className="text-lg md:hidden text-purple-400" />
            <p className="hidden md:block font-semibold text-gray-300 w-36">
              Created By:
            </p>
            <span>{election.createdBy?.name || "Unknown"}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <button
            onClick={endElectionHandler}
            disabled={ending || !election.isActive}
            className={`flex items-center gap-2 bg-red-600 hover:bg-red-800 text-white py-2 px-6 rounded-lg font-bold shadow-md hover:shadow-red-500/70 transition-all glow disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="End Election"
          >
            <FaStopCircle className="md:hidden" />
            <span className="hidden md:inline">End Election</span>
          </button>

          <button
            onClick={goToResults}
            disabled={election.isActive}
            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg font-bold shadow-md hover:shadow-blue-500/70 transition-all glow disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Get Election Results"
          >
            <FaPoll className="md:hidden" />
            <span className="hidden md:inline">Get Election Result</span>
          </button>
        </div>
      </div>

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

export default ElectionEndPage;
