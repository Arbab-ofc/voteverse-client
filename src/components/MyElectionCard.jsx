import React from 'react';
import {
  FaUser,
  FaHourglassStart,
  FaHourglassEnd,
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaUserMinus,
  FaVoteYea,
  FaPowerOff,
  FaChartBar,
  FaInfoCircle, 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyElectionCard = ({ election }) => {
  const { title, startDate, endDate, createdBy, isActive } = election;
  const navigate = useNavigate();

  const handleAddCandidate = () => {
    navigate('/add-candidate', {
      state: { electionId: election._id },
    });
  };

  const handleViewCandidates = () => {
    navigate("/candidates", {
      state: {
        electionId: election._id,
      },
    });
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const handleDeleteNavigation = (election) => {
    navigate("/delete-election", {
      state: {
        electionId: election._id,
        title: election.title,
        startDate: election.startDate,
        endDate: election.endDate,
      },
    });
  };

  const handleClick = (electionId) => {
    navigate("/update-election", {
      state: { electionId },
    });
  };

  const handleRemoveCandidate = () => {
    navigate("/remove-candidate", { state: { electionId: election._id, electionTitle: election.title } });
  };

  const handleEndElection = () => {
    navigate("/end-election", { state: { electionId: election._id, electionTitle: election.title } });
  };

  const handleViewResult = () => {
    navigate("/election-result", { state: { electionId: election._id } });
  };

  const handleInfoClick = () => {
    navigate(`/election-details/${election._id}`);
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white w-full sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] transition-transform hover:scale-[1.02] duration-200 flex flex-col justify-between">

      
      <div className="flex justify-end mb-2">
        <button
          onClick={handleInfoClick}
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="More info"
          title="More info"
        >
          <FaInfoCircle size={20} />
        </button>
      </div>

      <div className={`mb-3 font-semibold text-center ${isActive ? 'text-green-400' : 'text-red-500'}`}>
        {isActive ? (
          <>
            <FaPowerOff className="inline-block sm:hidden mr-1" />
            <span className="hidden sm:inline-block md:hidden">Active</span>
            <span className="hidden md:inline">Election Active</span>
          </>
        ) : (
          <>
            <FaPowerOff className="inline-block sm:hidden mr-1" />
            <span className="hidden sm:inline-block md:hidden">Ended</span>
            <span className="hidden md:inline">Election Ended</span>
          </>
        )}
      </div>

      <h2 className="text-lg font-semibold mb-3 truncate">{title}</h2>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2">
          <FaUser className="block sm:hidden" />
          <span className="hidden sm:inline-block md:hidden">
            <FaUser className="inline-block mr-1" /> By
          </span>
          <span className="hidden md:inline">Created By:</span>
          <span className="ml-auto truncate text-gray-300">{createdBy?.name || 'Unknown'}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaHourglassStart className="block sm:hidden" />
          <span className="hidden sm:inline-block md:hidden">
            <FaHourglassStart className="inline-block mr-1" /> Start
          </span>
          <span className="hidden md:inline">Start Date:</span>
          <span className="ml-auto text-gray-300">{formatDate(startDate)}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaHourglassEnd className="block sm:hidden" />
          <span className="hidden sm:inline-block md:hidden">
            <FaHourglassEnd className="inline-block mr-1" /> End
          </span>
          <span className="hidden md:inline">End Date:</span>
          <span className="ml-auto text-gray-300">{formatDate(endDate)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">

        <button
          onClick={() => handleClick(election._id)}
          disabled={!isActive}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            isActive
              ? 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-blue-500'
              : 'bg-blue-700 cursor-not-allowed opacity-60'
          }`}
        >
          <FaEdit /> <span className="hidden md:inline">Update</span>
        </button>

        <button
          onClick={() => handleDeleteNavigation(election)}
          disabled={!isActive}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            isActive
              ? 'bg-red-600 hover:bg-red-700 shadow-md hover:shadow-red-600'
              : 'bg-red-800 cursor-not-allowed opacity-60'
          }`}
        >
          <FaTrash /> <span className="hidden md:inline">Delete</span>
        </button>

        <button
          onClick={handleAddCandidate}
          disabled={!isActive}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            isActive
              ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-green-600'
              : 'bg-green-800 cursor-not-allowed opacity-60'
          }`}
        >
          <FaUserPlus /> <span className="hidden md:inline">Add</span>
        </button>

        <button
          onClick={handleRemoveCandidate}
          disabled={!isActive}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            isActive
              ? 'bg-yellow-600 hover:bg-yellow-700 shadow-md hover:shadow-yellow-600'
              : 'bg-yellow-800 cursor-not-allowed opacity-60'
          }`}
        >
          <FaUserMinus /> <span className="hidden md:inline">Remove</span>
        </button>

        <button
          onClick={handleViewCandidates}
          disabled={!isActive}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            isActive
              ? 'bg-white text-black hover:bg-gray-300 shadow-md hover:shadow-gray-400'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-60'
          }`}
        >
          <FaVoteYea /> <span className="hidden md:inline">Vote</span>
        </button>

        <button
          onClick={handleEndElection}
          disabled={!isActive}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            isActive
              ? 'bg-gray-700 hover:bg-gray-600 shadow-md hover:shadow-gray-600'
              : 'bg-gray-900 cursor-not-allowed opacity-60'
          }`}
        >
          <FaPowerOff /> <span className="hidden md:inline">End</span>
        </button>

        <button
          onClick={handleViewResult}
          disabled={isActive} 
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md transition-shadow ${
            !isActive
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-600'
              : 'bg-indigo-900 cursor-not-allowed opacity-60'
          }`}
        >
          <FaChartBar /> <span className="hidden md:inline">Result</span>
        </button>
      </div>
    </div>
  );
};

export default MyElectionCard;
