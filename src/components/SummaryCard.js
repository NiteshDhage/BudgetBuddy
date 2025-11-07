import React from "react";

export default function SummaryCard({ title, value, color, bg }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${bg}`}
    >
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-2xl md:text-3xl font-bold mt-2 ${color}`}>{value}</p>

      {/* Decorative line */}
      <div className="w-12 h-1 mt-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
    </div>
  );
}
