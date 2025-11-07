import React, { useMemo, useState } from "react";
import { useBudget } from "../context/BudgetContext";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const { transactions, user, logout } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState("all");

  // 🎨 Chart Colors
  const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

  // 🧮 Filter by selected month
  const filtered = useMemo(() => {
    if (selectedMonth === "all") return transactions;
    return transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() + 1 === parseInt(selectedMonth);
    });
  }, [transactions, selectedMonth]);

  // 💰 Totals
  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  // 🍕 Category Breakdown
  const categoryData = useMemo(() => {
    const catMap = {};
    filtered
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      });
    return Object.keys(catMap).map((key) => ({
      name: key,
      value: catMap[key],
    }));
  }, [filtered]);

  // 📊 Income vs Expense Bar Data
  const typeData = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
  ];

  // 📈 Monthly Trend Line Data
  const monthlyTrend = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = new Date(t.date).toLocaleString("default", { month: "short" });
      map[m] = map[m] || { month: m, income: 0, expense: 0 };
      if (t.type === "income") map[m].income += t.amount;
      else map[m].expense += t.amount;
    });
    return Object.values(map);
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-4">
      {/* Navbar */}
      <Navbar
        title="Analytics Overview"
        rightAction={
          <button
            onClick={logout}
            className="text-sm text-red-500 font-semibold hover:text-red-700"
          >
            Logout
          </button>
        }
      />

      {/* Header */}
      <div className="max-w-5xl mx-auto mt-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          Financial Analytics for {user?.name || "User"} 📊
        </h1>
        <p className="text-gray-600">
          Get a complete picture of your income, expenses, and spending trends.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-6">
        <SummaryCard
          title="Total Income"
          value={`₹${income}`}
          color="text-green-600"
          bg="bg-green-100"
        />
        <SummaryCard
          title="Total Expense"
          value={`₹${expense}`}
          color="text-red-600"
          bg="bg-red-100"
        />
        <SummaryCard
          title="Balance"
          value={`₹${balance}`}
          color="text-indigo-600"
          bg="bg-indigo-100"
        />
      </div>

      {/* Month Filter */}
      <div className="max-w-5xl mx-auto mt-8 flex justify-end">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Charts Section */}
      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Income vs Expense
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expense by Category
          </h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No expense data available.</p>
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Monthly Income vs Expense Trend
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Section */}
      <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Insights</h2>
        {expense > income ? (
          <p className="text-red-600 font-medium">
            ⚠ You’re spending more than you earn. Try setting a savings goal or cutting
            unnecessary expenses.
          </p>
        ) : balance > 0 ? (
          <p className="text-green-600 font-medium">
            🎉 Great job! You’re managing your finances well and maintaining a positive
            balance.
          </p>
        ) : (
          <p className="text-gray-600 font-medium">
            📊 Keep tracking — consistent data helps reveal spending patterns.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} BudgetBuddy — Analyze. Improve. Grow.
      </footer>
    </div>
  );
}

