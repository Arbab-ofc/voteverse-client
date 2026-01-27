import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Mail, Info, LogIn, UserPlus, LayoutDashboard, LogOut, User } from "lucide-react";
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
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="h-4 w-4" /> },
    { name: "About", path: "/about", icon: <Info className="h-4 w-4" /> },
    isAuthenticated
      ? { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> }
      : { name: "Login", path: "/login", icon: <LogIn className="h-4 w-4" /> },
    isAuthenticated
      ? { name: "My Profile", path: "/my-profile", icon: <User className="h-4 w-4" /> }
      : null,
  ].filter(Boolean);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-white/80 backdrop-blur-xl border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
            <span className="font-display text-lg font-semibold tracking-[0.2em] text-[var(--vv-ink)]">
              VOTEVERSE
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  location.pathname === item.path
                    ? "bg-[var(--vv-ink)] text-white"
                    : "text-[var(--vv-ink)] hover:bg-black/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[var(--vv-ink)] hover:bg-black/5"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/register"
                className="rounded-full bg-[var(--vv-ink)] px-4 py-2 text-sm font-semibold text-white"
              >
                Get started
              </Link>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded-full border border-black/10 bg-white p-2 text-[var(--vv-ink)]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold tracking-[0.2em]">VOTEVERSE</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-black/10 p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    location.pathname === item.path
                      ? "bg-[var(--vv-ink)] text-white"
                      : "bg-[var(--vv-sand)] text-[var(--vv-ink)]"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.icon}
                </Link>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full bg-[var(--vv-ink)] px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Create account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
