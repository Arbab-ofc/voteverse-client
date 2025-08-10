import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaIdBadge,
  FaCalendarAlt,
  FaUser,
  FaTrophy,
  FaMedal,
  FaSmileBeam,
  FaChartBar,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElectionResultPage = () => {
  const location = useLocation();
  const electionId = location.state?.electionId;

  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState(null);
  const [result, setResult] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
  if (!electionId) {
    toast.error("No election ID found in state");
    setLoading(false);
    return;
  }
  console.log("Fetching results for election ID:", electionId);

  const fetchResult = async () => {
    try {
      const res = await axios.get(
        `https://voteverse-server.onrender.com/api/elections/result/${electionId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setElection(res.data.election || {});
        setResult(res.data.result);
        setWinner(res.data.winner);
        toast.success("Election results loaded!");
      } else {
        toast.error(res.data.message || "Failed to fetch results");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Server error fetching results"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchResult();
}, [electionId]);


const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid Date";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  
  const chartData = {
    labels: result.map((r) => r.candidate.name),
    datasets: [
      {
        label: "Votes",
        data: result.map((r) => r.votes),
        backgroundColor: result.map((r) =>
          winner && r.candidate._id === winner.candidate._id
            ? "#34d399"
            : "#60a5fa"
        ),
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: "Votes per Candidate",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading election results...
      </div>
    );
  }

  if (!result.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl p-4 text-center">
        No candidates or results found for this election.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-6 text-white max-w-screen mx-auto space-y-8 pt-24" >
      
      <h1
        className="text-4xl font-extrabold text-blue-400 select-none cursor-pointer inline-block
        glow-effect hover:animate-vibrate transition-all"
        title="Election Title"
      >
        {election.title || "Election Title"}
      </h1>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900 rounded-xl p-5 shadow-lg shadow-blue-600/50">
        <div className="flex items-center gap-2">
          <FaIdBadge className="text-xl text-blue-400 sm:block md:hidden" />
          <span className="hidden md:inline font-semibold">Election ID:</span>
          <span className="ml-auto font-mono break-all text-gray-300">
            {election._id || electionId}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-xl text-green-400 sm:block md:hidden" />
          <span className="hidden md:inline font-semibold">Start Date:</span>
          <span className="ml-auto">{formatDate(election.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-xl text-red-400 sm:block md:hidden" />
          <span className="hidden md:inline font-semibold">End Date:</span>
          <span className="ml-auto">{formatDate(election.endDate)}</span>
        </div>
      </div>

      
      <div className="bg-gray-900 rounded-xl p-5 shadow-lg shadow-indigo-600/50 space-y-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaUser /> Candidates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map(({ candidate, votes }) => {
            const isWinner = winner && candidate._id === winner.candidate._id;
            return (
              <div
                key={candidate._id}
                className={`bg-gray-800 p-4 rounded-lg shadow-md border-2 transition-all duration-300 ${
                  isWinner
                    ? "border-green-400 shadow-green-500/80"
                    : "border-transparent"
                } hover:scale-[1.03]`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold truncate">{candidate.name}</h3>
                  {isWinner && (
                    <FaMedal className="text-yellow-400 text-xl animate-pulse" title="Winner" />
                  )}
                </div>
                <p className="mb-1 text-sm font-mono text-gray-400 truncate break-all">
                  <FaIdBadge className="inline mr-1" /> {candidate._id}
                </p>
                <p className="text-sm italic text-gray-300 mb-2 line-clamp-3">{candidate.bio || "No bio available"}</p>
                <p className="font-semibold text-green-400">
                  Votes: {votes}
                </p>
                <p className="mt-2 text-sm">
                  {isWinner ? (
                    <span className="text-green-300 font-bold flex items-center gap-1">
                      <FaTrophy /> Congratulations! You won the election 🎉
                    </span>
                  ) : (
                    <span className="text-gray-400 flex items-center gap-1">
                      <FaSmileBeam /> Great effort! Keep it up 💪
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      
      <div className="bg-gray-900 rounded-xl p-5 shadow-lg shadow-purple-600/60">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        toastClassName="font-semibold"
      />

      
      <style>{`
        .glow-effect {
          text-shadow:
            0 0 8px #3b82f6,
            0 0 15px #2563eb,
            0 0 20px #2563eb,
            0 0 25px #1e40af;
        }
        @keyframes vibrate {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }
        .animate-vibrate:hover {
          animation: vibrate 0.3s linear infinite;
        }
        /* line-clamp for bios */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ElectionResultPage;
