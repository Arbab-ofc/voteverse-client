import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaVoteYea, FaUserShield } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (name.length < 6) return toast.error('Name must be at least 6 characters long');
    if (password.length < 8) return toast.error('Password must be at least 8 characters long');

    try {
      await axios.post(
        'https://voteverse-server.onrender.com/api/users/register',
        { name, email, password },
        { withCredentials: true }
      );
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-white via-gray-200 to-gray-100 text-white-800">

      <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center text-white p-8 space-y-6 bg-gradient-to-r from-black via-gray-900 to-black">
        <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white text-center md:whitespace-nowrap">
          Welcome to VoteVerse
        </h1>
        <p className="text-lg text-center max-w-md md:max-w-sm text-white-800 leading-snug md:whitespace-nowrap tracking-widest">
          Your voice, your power...
        </p>
        <div className="flex space-x-6 text-4xl text-white-700">
          <FaVoteYea className="hover:text-yellow-300 transition" />
          <FaUserShield className="hover:text-yellow-300 transition" />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-1 items-center justify-center px-4 py-12 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Register
            </button>

            
            <p className="mt-4 text-center text-gray-700 text-sm">
              Want to verify your account?{' '}
              <button
                type="button"
                onClick={() => navigate('/resend-otp', { state: { email: formData.email } })}
                className="text-black font-semibold hover:underline transition-all"
              >
                Resend OTP
              </button>
            </p>
          </form>

          <p className="mt-4 text-center text-gray-700 text-sm">
            Already registered?{' '}
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

export default Register;
