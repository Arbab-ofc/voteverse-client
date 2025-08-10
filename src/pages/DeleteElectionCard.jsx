import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash, FaTimes, FaCheck, FaIdBadge, FaCalendarAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const DeleteElectionCard = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const { electionId, title, startDate, endDate } = state || {};

  const [showConfirm, setShowConfirm] = useState(false);

  if (!electionId) {
    toast.error("Election data missing.");
    navigate("/dashboard");
    return null;
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://voteverse-server.onrender.com/api/elections/${electionId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Election deleted successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete election.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-4">
      
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-lg md:hidden" />
            <p className="hidden md:block font-medium">Election ID:</p>
            <span className="break-all">{electionId}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-lg md:hidden" />
            <p className="hidden md:block font-medium">Start Date:</p>
            <span>{new Date(startDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-lg md:hidden" />
            <p className="hidden md:block font-medium">End Date:</p>
            <span>{new Date(endDate).toLocaleDateString()}</span>
          </div>
        </div>

        
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-6 w-full bg-red-600 hover:bg-red-800 text-white py-2 rounded-lg font-bold shadow-md hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaTrash className="md:hidden" />
          <span className="hidden md:inline">Delete Election</span>
        </button>
      </div>

      
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <p className="mb-6 text-lg font-semibold">
              Are you sure you want to delete this election?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-gray-400/50 transition-all"
              >
                <FaTimes className="md:hidden" />
                <span className="hidden md:inline">Cancel</span>
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-red-500/50 transition-all"
              >
                <FaCheck className="md:hidden" />
                <span className="hidden md:inline">Sure</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteElectionCard;
