import React from 'react';
import { FaUser, FaHourglassStart, FaHourglassEnd, FaCheckCircle, FaTimesCircle, FaPoll } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ElectionCard = ({ election }) => {
  const { title, startDate, endDate, createdBy } = election;
  const navigate = useNavigate(); 

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const now = new Date();
  const hasStarted = new Date(startDate) <= now;
  const hasEnded = new Date(endDate) < now;
  const isActive = hasStarted && !hasEnded;

  const handleViewCandidates = () => {
    navigate("/candidates", {
      state: {
        electionId: election._id, 
      },
    });
  };

  const handleViewResult = () => {
    navigate("/election-result", {
      state: {
        electionId: election._id, 
      },
    });
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white w-full sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] transition-transform hover:scale-[1.02] duration-200 flex flex-col justify-between">
      
      
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

        
        <div className="flex items-center gap-2">
          {isActive ? (
            <>
              <FaCheckCircle className="text-green-400 block sm:hidden" />
              <span className="hidden sm:inline-block md:hidden text-green-400">
                <FaCheckCircle className="inline-block mr-1" /> Active
              </span>
              <span className="hidden md:inline text-green-400 font-semibold">Status: Active</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-400 block sm:hidden" />
              <span className="hidden sm:inline-block md:hidden text-red-400">
                <FaTimesCircle className="inline-block mr-1" /> Inactive
              </span>
              <span className="hidden md:inline text-red-400 font-semibold">Status: Inactive</span>
            </>
          )}
        </div>
      </div>

      
      <div className="flex gap-2 mt-auto">
        
        <button
          className={`flex-1 px-4 py-2 font-medium rounded-md transition-all duration-200 ${
            isActive
              ? 'bg-white text-black hover:bg-gray-300'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
          onClick={handleViewCandidates}
          disabled={!isActive}
        >
          Vote
        </button>

        
        <button
          className={`flex-1 px-4 py-2 font-medium rounded-md flex items-center justify-center gap-1 transition-all duration-200 ${
            hasEnded
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
          onClick={handleViewResult}
          disabled={!hasEnded}
        >
          <FaPoll className="block sm:hidden" />
          <span className="hidden sm:inline-block md:hidden">
            <FaPoll className="inline-block mr-1" /> Result
          </span>
          <span className="hidden md:inline">View Result</span>
        </button>
      </div>
    </div>
  );
};

export default ElectionCard;
