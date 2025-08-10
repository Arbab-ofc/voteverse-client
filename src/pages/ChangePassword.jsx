import React, { useState } from "react";
import { Lock, Shield } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://voteverse-server.onrender.com/api/users/change-password",
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Password changed successfully", {
        autoClose: 1500, 
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password", {
        autoClose: 1500, 
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white pt-16">
      
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 animate-pulse text-center">
        <div className="max-w-md">
          <Shield className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold mb-4">Change Your Password</h2>
          <p className="text-gray-300">
            Keeping your account secure is our top priority. Make sure to use a
            strong password that you haven’t used before and never share it with
            anyone.
          </p>
        </div>
      </div>

      
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <form
          onSubmit={handleChangePassword}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <Lock className="w-6 h-6" /> Change Password
          </h2>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-gray-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-gray-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded bg-gray-700 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(255,255,0,0.7)]"
          >
            Change Password
          </button>
        </form>
      </div>

      
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default ChangePassword;
