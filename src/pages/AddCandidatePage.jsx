import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddCandidatePage() {
  const location = useLocation();
  const { electionId } = location.state || {};
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!electionId) {
      return toast.error("Election ID not found.");
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        '/api/v2/candidates/add-candidate',
        { ...formData, electionId },
        { withCredentials: true }
      );
      toast.success(res.data?.message || 'Candidate created successfully');
      setFormData({ name: '', bio: '' });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Something went wrong while creating candidate.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-24 md:flex transition-all duration-500">
      
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Add Candidate</h2>
          <p className="text-gray-400">“Make your voice heard by adding worthy contenders to your election.”</p>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Candidate Form</h3>

          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Candidate'}
          </button>
        </form>
      </div>
    </div>
  );
}
