import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Mail, Info, LogIn, UserPlus, LayoutDashboard, LogOut, User } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 

const Header = ({ isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://voteverse-server.onrender.com/api/users/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Contact Us", path: "/contact", icon: <Mail /> },
    { name: "About", path: "/about", icon: <Info /> },
    isAuthenticated
      ? { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> }
      : { name: "Login", path: "/login", icon: <LogIn /> },
    isAuthenticated
      ? { name: "My Profile", path: "/my-profile", icon: <User /> } 
      : null,
    isAuthenticated
      ? { name: "Logout", path: "#", icon: <LogOut />, onClick: handleLogout }
      : { name: "Register", path: "/register", icon: <UserPlus /> },
  ].filter(Boolean); 

  return (
    <header className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold tracking-widest">
          <Typewriter
            words={["V O T E  V E R S E", "Empowering Democracy"]}
            loop={0}
            cursor
            cursorStyle="."
            typeSpeed={120}
            deleteSpeed={70}
          />
        </h1>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
          </button>
        </div>

        
        <nav className="hidden md:flex gap-6 text-white text-lg font-medium">
          {navItems.map((item, index) =>
            item.name === "Logout" ? (
              <button
                key={index}
                onClick={item.onClick}
                className="hover:text-yellow-300 transition-all duration-300"
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="md:inline lg:hidden">{item.icon}</span>
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`hover:text-yellow-300 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "underline underline-offset-8 decoration-yellow-300"
                    : ""
                }`}
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="md:inline lg:hidden">{item.icon}</span>
              </Link>
            )
          )}
        </nav>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-start px-6 py-6 space-y-6 animate-slideIn overflow-y-auto">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={() => setMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {navItems.map((item, index) =>
            item.name === "Logout" ? (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setMenuOpen(false);
                }}
                className="block text-base font-medium w-full py-2 border-b border-gray-200 text-left"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block text-base font-medium w-full py-2 border-b border-gray-200 ${
                  location.pathname === item.path ? "text-gray-900 font-semibold" : "hover:text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
