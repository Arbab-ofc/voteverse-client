import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User, CheckCircle, Calendar, Mail, Key, Hash } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "./MyProfile.css"; 

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://voteverse-server.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
        toast.success("Profile loaded");
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 flex items-center justify-center p-4">
      
      <ToastContainer
        position="top-right"
        autoClose={500} 
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        transition={Slide}
      />

      <div
        className="flip-card w-80 h-96 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
          
          
          <div className="flip-card-front bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl shadow-xl flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          
          <div className="flip-card-back bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl shadow-xl flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-white">{user.name}</h2>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">ID: {user.id}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle
                className={`w-5 h-5 ${
                  user.isVerified ? "text-green-400" : "text-red-400"
                }`}
              />
              <span className="text-sm text-gray-300">
                {user.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">{user.email}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/change-password");
              }}
              className="bg-gray-700 px-5 py-2 rounded-lg text-white hover:shadow-[0_0_20px_4px_rgba(0,255,255,0.9)] hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
            >
              <Key className="w-5 h-5" />
              <span>Change Password</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
