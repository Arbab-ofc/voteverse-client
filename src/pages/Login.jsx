import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { fetchUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return toast.error('Email and password are required');

    try {
      const res = await axios.post(
        'https://voteverse-server.onrender.com/api/users/login',
        { email, password },
        { withCredentials: true }
      );

      const message = res?.data?.message;
      console.log('Login response:', res.data.message);

      if (message === 'User not found') return toast.error('User not found');
      if (message === 'Email not verified') return toast.error('Please verify your email before logging in');
      if (message === 'Invalid credentials') return toast.error('Invalid credentials');
      if (message === 'Token generation failed') return toast.error('Token generation failed');

      await fetchUser();
      toast.success('Login successful');
      

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-white via-gray-200 to-gray-100 text-white-800">

      
      <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center text-white p-8 space-y-6 bg-gradient-to-r from-black via-gray-900 to-black">
        <h1 className="text-4xl font-bold tracking-wider text-white">Welcome Back</h1>
        <p className="text-lg text-center max-w-md text-white-800">
          Login to continue your journey with VoteVerse.
        </p>
      </div>

      
      <div className="w-full md:w-1/2 flex flex-1 items-center justify-center px-4 py-12 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
            Login to Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
                required
              />
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-black"
                required
              />
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
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
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-700 text-sm">
            Don’t have an account?{' '}
            <a
              href="/register"
              className="text-black font-semibold hover:underline transition-all"
            >
              Register here
            </a>
          </p>

          
          <p className="mt-2 text-center text-gray-700 text-sm">
            Forgot your password?{' '}
            <a
              href="/forgot-password"
              className="text-black font-semibold hover:underline transition-all"
            >
              Reset here
            </a>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
