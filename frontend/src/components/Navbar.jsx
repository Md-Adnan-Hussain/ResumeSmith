import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <FileText size={24} />
          <span>ResumeSmith</span>
        </Link>
        {token ? (
          <div className="space-x-4">
            <button onClick={handleLogout} className="hover:text-blue-200">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hover:text-blue-200">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
