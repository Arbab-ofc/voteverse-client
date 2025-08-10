import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Edit, Info, Clock } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateElection = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, startDate, endDate } = formData;

    if (!title || !startDate || !endDate) {
      return toast.error('Title, Start Date and End Date are required!');
    }

    try {
      const { data } = await axios.post(
        'https://voteverse-server.onrender.com/api/elections/create-election',
        formData,
        { withCredentials: true } 
      );

      toast.success(data.message);
      setTimeout(() => navigate(`/dashboard`), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 pt-25">
      <ToastContainer position="top-center" theme="dark" />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn">
        
        
        <div className="flex flex-col justify-center text-gray-800 space-y-6">
          <h2 className="text-3xl font-extrabold">Start a New Election</h2>
          <p className="text-lg flex items-center gap-2">
            <Info className="text-indigo-500" /> Fill out the details to launch an election.
          </p>
          <p className="text-lg flex items-center gap-2">
            <CalendarDays className="text-green-500" /> Set the start and end dates precisely.
          </p>
          <p className="text-lg flex items-center gap-2">
            <Clock className="text-yellow-500" /> Candidates can be added after creation.
          </p>
        </div>

        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Election Title</label>
            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-indigo-500">
              <Edit className="text-gray-400" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-2 py-2 focus:outline-none"
                placeholder="Enter election title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Election description (optional)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Start Date</label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">End Date</label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 animate-glow"
            >
              Create Election
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateElection;
