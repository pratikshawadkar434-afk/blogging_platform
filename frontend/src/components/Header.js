import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, User, LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-gray-800 dark:via-gray-900 dark:to-black shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-yellow-300 transition-all"
        >
          MyBlog
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className={`hover:text-yellow-300 ${
              location.pathname === "/" ? "underline" : ""
            }`}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/create"
              className={`hover:text-yellow-300 ${
                location.pathname === "/create" ? "underline" : ""
              }`}
            >
              Write
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className={`hover:text-yellow-300 ${
                  location.pathname === "/login" ? "underline" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`hover:text-yellow-300 ${
                  location.pathname === "/register" ? "underline" : ""
                }`}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-300 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}

          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 bg-white dark:bg-gray-700 text-black dark:text-yellow-400 rounded-full shadow-md hover:scale-110 transition"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
