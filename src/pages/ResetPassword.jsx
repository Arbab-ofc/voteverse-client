import React, { useState } from "react";
import { FaKey, FaLock, FaInfoCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; 

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post(
        "/api/v2/users/reset-password",
        {
          email,
          otp: formData.otp,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }
      );

      toast.success(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong while resetting"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full pt-25">

        
        <div className="flex-1 bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-purple-500"
             style={{ boxShadow: "0 0 20px rgba(168,85,247,0.8)" }}>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <FaInfoCircle /> Reset Your Password
          </h2>
          <p className="mb-4">
            To keep your account secure, never share your password or OTP with anyone.
            A strong password contains a mix of uppercase, lowercase, numbers, and symbols.
          </p>
          <p className="mb-4">
            Steps to reset password:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Check your email for the OTP we sent.</li>
            <li>Enter the OTP below along with your new password.</li>
            <li>Make sure both password fields match before submitting.</li>
          </ul>
        </div>

        
        <div className="flex-1 bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-cyan-400"
             style={{ boxShadow: "0 0 20px rgba(34,211,238,0.8)" }}>
          <h2 className="text-2xl font-bold mb-6">Enter Details</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            
            <div className="relative">
              <input
                type="email"
                value={email || ""}
                readOnly
                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
              />
              <FaKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <div className="relative">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
              />
              <FaKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <div className="relative">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
              />
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
              />
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all"
              style={{
                boxShadow: "0 0 10px rgba(34,211,238,0.9), 0 0 20px rgba(34,211,238,0.7)",
              }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ResetPassword;
