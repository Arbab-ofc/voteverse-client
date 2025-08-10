import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaEnvelope, FaSyncAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const ResendOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    setLoading(true);
    try {
      const res = await axios.post(
        'https://voteverse-server.onrender.com/api/users/resend-otp',
        { email },
        { withCredentials: true }
      );

      if (res.data.message) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/verify-otp', { state: { email } });
        }, 2000);
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-white via-gray-200 to-gray-100 text-gray-800">

      <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center p-8 space-y-6 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center md:whitespace-nowrap">
          Resend Your OTP
        </h1>
        <p className="text-lg text-center max-w-md md:max-w-sm leading-snug tracking-widest">
          Enter your email to get a new OTP and verify your account.
        </p>
        <div className="flex space-x-6 text-4xl text-yellow-400">
          <FaSyncAlt className="hover:text-yellow-300 transition" />
          <FaEnvelope className="hover:text-yellow-300 transition" />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-1 items-center justify-center px-4 py-12 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
            Generate OTP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
                required
              />
              <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending...' : 'Generate OTP'}
              <FaSyncAlt className={`animate-spin ${loading ? 'inline-block' : 'hidden'}`} />
            </button>
          </form>

          <p className="mt-4 text-center text-gray-700 text-sm">
            Remembered your OTP?{' '}
            <a
              href="/login"
              className="text-black font-semibold hover:underline transition-all"
            >
              Login here
            </a>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ResendOtp;
