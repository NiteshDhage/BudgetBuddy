import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-center px-4">
      {/* 404 Number */}
      <h1 className="text-[8rem] font-extrabold text-indigo-600 drop-shadow-lg animate-bounce">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
        Oops! Page Not Found 😢
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you’re looking for might have been moved, deleted, or doesn’t exist.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
        >
          Go Back
        </button>
      </div>

      {/* Decorative Illustration */}
      <div className="mt-12">
        <svg
          className="w-64 h-64 text-indigo-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" strokeOpacity="0.3" />
          <path
            d="M60 130 Q100 60 140 130"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <circle cx="80" cy="85" r="5" fill="currentColor" />
          <circle cx="120" cy="85" r="5" fill="currentColor" />
        </svg>
      </div>

      <footer className="text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} BudgetBuddy — Smart money tracking.
      </footer>
    </div>
  );
}
