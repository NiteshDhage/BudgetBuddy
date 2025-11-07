import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ title = "BudgetBuddy", rightAction }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/app" },
    { name: "Transactions", path: "/transactions" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* App Title */}
        <div
          className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-700 transition"
          onClick={() => navigate("/app")}
        >
          {title}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`font-medium transition ${
                location.pathname === link.path
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right-side Action (e.g. Logout Button) */}
        <div className="flex items-center space-x-4">{rightAction}</div>
      </div>

      {/* Mobile Nav (visible only on small screens) */}
      <div className="flex md:hidden justify-center space-x-6 pb-2">
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`text-sm font-medium transition ${
              location.pathname === link.path
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-500"
            }`}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
