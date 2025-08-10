import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaVoteYea, FaUsers, FaCalendarAlt, FaPen, FaPlus, FaMinus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateElection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const electionId = state?.electionId;

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    candidates: [],
  });

  const [originalForm, setOriginalForm] = useState({});
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
        const election = res.data.election;
        setForm({
          title: election.title || "",
          description: election.description || "",
          startDate: election.startDate ? new Date(election.startDate) : null,
          endDate: election.endDate ? new Date(election.endDate) : null,
          candidates: election.candidates?.map((c) => c._id) || [],
        });
        setOriginalForm({
          title: election.title || "",
          description: election.description || "",
          startDate: election.startDate ? new Date(election.startDate) : null,
          endDate: election.endDate ? new Date(election.endDate) : null,
          candidates: election.candidates?.map((c) => c._id) || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch election details.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  
  const isFormChanged = JSON.stringify(form) !== JSON.stringify(originalForm);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (form.title) payload.title = form.title;
      if (form.description) payload.description = form.description;
      if (form.startDate) payload.startDate = form.startDate;
      if (form.endDate) payload.endDate = form.endDate;
      if (form.candidates.length) payload.candidates = form.candidates;

      await axios.put(`https://voteverse-server.onrender.com/api/elections/${electionId}`, payload, {
        withCredentials: true,
      });

      toast.success("Election updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update election.");
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 pt-20 p-4 text-white flex flex-col md:flex-row gap-8">
      
      <div className="md:w-1/2 space-y-6 p-6 rounded-lg bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaVoteYea className="text-blue-500" /> Update Your Election
        </h2>
        <p className="text-gray-300">Modify the details of your election easily.</p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <FaUsers className="text-green-400" /> Add or remove candidates anytime.
          </li>
          <li className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-400" /> Change election dates instantly.
          </li>
          <li className="flex items-center gap-2">
            <FaPen className="text-pink-400" /> Edit title and description with ease.
          </li>
        </ul>
      </div>

      
      <div className="md:w-1/2 p-6 bg-gray-900 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            placeholder="Election Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          
          <textarea
            placeholder="Election Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          
          <DatePicker
            selected={form.startDate}
            onChange={(date) => handleChange("startDate", date)}
            placeholderText="Select Start Date & Time"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="Pp"
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          />

          
          <DatePicker
            selected={form.endDate}
            onChange={(date) => handleChange("endDate", date)}
            placeholderText="Select End Date & Time"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="Pp"
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          />

          
          <div className="flex gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => navigate("/add-candidate", { state: { electionId } })}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-green-500/50 transition-all"
            >
              <FaPlus className="md:hidden" />
              <span className="hidden md:inline">Add Candidate</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/remove-candidate", { state: { electionId } })}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-red-500/50 transition-all"
            >
              <FaMinus className="md:hidden" />
              <span className="hidden md:inline">Remove Candidate</span>
            </button>
          </div>

          
          <button
            type="submit"
            disabled={!isFormChanged}
            className={`w-full py-3 rounded-lg font-bold transition-all ${
              isFormChanged
                ? "bg-blue-600 hover:bg-blue-800 shadow-md hover:shadow-blue-500/50"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Update Election
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default UpdateElection;
