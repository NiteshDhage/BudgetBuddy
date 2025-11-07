import React from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import PieChartComponent from "../components/PieChartComponent";
import SummaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, transactions, addTransaction, deleteTransaction, logout, loading } = useBudget();

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Calculate summary values
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Time-based greeting
  const hours = new Date().getHours();
  const greeting =
    hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-4">
      {/* Navbar */}
      <Navbar
        title="BudgetBuddy"
        rightAction={
          <button
            onClick={logout}
            className="text-sm text-red-500 font-semibold hover:text-red-700"
          >
            Logout
          </button>
        }
      />

      {/* Greeting */}
      <div className="max-w-4xl mx-auto mt-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          {greeting}, {user.name}! 👋
        </h1>
        <p className="text-gray-600">Here’s your financial overview today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
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

      {/* Add Transaction */}
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">➕ Add Transaction</h2>
        <AddTransaction onAdd={addTransaction} />
      </div>

      {/* Chart + List Section */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Expense Breakdown</h2>
          <PieChartComponent transactions={transactions} />
        </div>

        {/* Transactions List */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🧾 Recent Transactions</h2>
          {transactions.length > 0 ? (
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          ) : (
            <p className="text-gray-500 text-center">No transactions yet.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} BudgetBuddy — Track smarter. Save better.
      </footer>
    </div>
  );
}
        