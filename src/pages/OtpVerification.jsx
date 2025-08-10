
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!email) {
      toast.error('Email is required');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      return toast.error('Email and OTP are required');
    }

    try {
      const response = await axios.post(
        'https://voteverse-server.onrender.com/api/users/verify-otp',
        { email, otp },
        { withCredentials: true }
      );

      toast.success('OTP verified successfully. You can now login.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || 'Server error';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-white via-gray-200 to-gray-100 text-white-800">

      
      <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center text-white p-8 space-y-6 bg-gradient-to-r from-black via-gray-900 to-black">
        <h1 className="text-4xl font-bold tracking-wider text-white">Verify Your Email</h1>
        <p className="text-lg text-center max-w-md text-white-800">
          Please enter the 6-digit OTP sent to your registered email.
        </p>
      </div>

      
      <div className="w-full md:w-1/2 flex flex-1 items-center justify-center px-4 py-12 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 tracking-wide">
            OTP Verification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              maxLength="6"
              autoFocus
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default OtpVerification;
