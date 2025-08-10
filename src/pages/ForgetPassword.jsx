import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      const res = await axios.post(
        "https://voteverse-server.onrender.com/api/users/forget",
        { email }
      );

      toast.success(res.data.message || "OTP sent successfully");
      navigate("/verify-forget-otp", { state: { email } }); 
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong while sending OTP"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 ">
      
      
      <div className="flex-1 flex flex-col justify-center items-center p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 pt-10">
          <FaKey className="text-yellow-400" /> Why You Should Not Forget Password
        </h1>
        <p className="text-gray-300 max-w-md text-center mb-6 ">
          Forgetting your password can lock you out of important accounts and 
          compromise your security. Always keep it safe and unique.
        </p>
        <h2 className="text-2xl font-semibold mb-2">How to Reset Your Password</h2>
        <p className="text-gray-400 max-w-md text-center">
          Enter your registered email, we will send you a One Time Password (OTP). 
          Use the OTP to verify and then reset your password securely.
        </p>
      </div>

      
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-semibold transition-all duration-300"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,0,1) 0%, rgba(255,165,0,1) 100%)",
                boxShadow: "0 0 10px rgba(255,255,0,0.8), 0 0 20px rgba(255,165,0,0.6)"
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255,255,0,1), 0 0 40px rgba(255,165,0,0.9)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(255,255,0,0.8), 0 0 20px rgba(255,165,0,0.6)")
              }
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ForgetPassword;
