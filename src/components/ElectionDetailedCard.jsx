import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCopy, FaVoteYea } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const ElectionDetailedCard = () => {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const [election, setElection] = useState(null);

  useEffect(() => {
    if (!electionId) {
      console.log('No election ID provided in URL');
      toast.error('No election ID provided in URL');
      return;
    }
    const fetchElection = async () => {
      try {
        const res = await axios.get(`https://voteverse-server.onrender.com/api/elections/id/${electionId}`, { withCredentials: true });
        if (res.data.success) {
          setElection(res.data.election);
        } else {
          toast.error(res.data.message || 'Failed to fetch election details');
        }
      } catch (error) {
        toast.error('Server error while fetching election details');
        console.error(error);
      }
    };

    fetchElection();
  }, [electionId]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const handleVoteClick = () => {
    if (!electionId) {
      toast.error('Election ID missing');
      return;
    }
    navigate('/vote', { state: { electionId } });
  };

  const handleCopyLink = () => {
    if (!electionId) {
      toast.error('Election ID missing');
      return;
    }
    const url = `${window.location.origin}/election-details/${electionId}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Election link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link.'));
  };

  if (!election) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Loading election details...
      </div>
    );
  }

  const {
    _id,
    title,
    startDate,
    endDate,
    candidates = [],
    isActive,
  } = election;

  const handleViewCandidates = () => {
    navigate("/candidates", {
      state: {
        electionId: election._id,
      },
    });
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-4 sm:p-6 md:p-10 flex justify-center items-center">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 mt-20">
        
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg space-y-5">
          <h2 className="text-3xl font-bold truncate">{title}</h2>

          <div className="flex justify-between text-sm text-gray-300">
            <div>
              <p><strong>Start:</strong> {formatDate(startDate)}</p>
              <p><strong>End:</strong> {formatDate(endDate)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold pt-2 ${
              isActive ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {isActive ? 'Active' : 'Ended'}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Candidates:</p>
            <ul className="max-h-32 overflow-y-auto space-y-1 text-gray-300 text-sm">
              {candidates.length ? (
                candidates.map((cand) => (
                  <li key={cand._id} className="flex justify-between border-b border-gray-700 pb-1">
                    <span>{cand.name}</span>
                    <span className="text-xs text-gray-500">ID: {cand._id}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No candidates available</li>
              )}
            </ul>
          </div>

          <p className="text-xs text-gray-400 truncate">
            <strong>Election ID:</strong> {_id}
          </p>

          <div className="flex justify-between items-center mt-4 space-x-3">
            
            <div className="relative group">
              <button
                onClick={handleVoteClick}
                disabled={!isActive}
                className={`flex items-center gap-2 px-5 py-2 rounded-md font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg cursor-pointer'
                    : 'bg-gray-700 cursor-not-allowed opacity-60'
                }`}
              >
                <FaVoteYea /> Vote
              </button>
    
              {!isActive && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                  Voting has been closed
                </div>
              )}
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
            >
              <span className="block lg:hidden">
                <FaCopy size={18} />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Copy Link
              </span>
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ElectionDetailedCard;
