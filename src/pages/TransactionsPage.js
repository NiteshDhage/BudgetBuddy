import React, { useState, useMemo } from "react";
import { useBudget } from "../context/BudgetContext";
import TransactionList from "../components/TransactionList";
import SummaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";

export default function TransactionsPage() {
  const { transactions, deleteTransaction, user, logout } = useBudget();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) =>
        filter === "all" ? true : t.type.toLowerCase() === filter.toLowerCase()
      )
      .filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.category?.toLowerCase().includes(search.toLowerCase())
      );
  }, [transactions, filter, search]);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-4">
      <Navbar
        title="All Transactions"
        rightAction={
          <button
            onClick={logout}
            className="text-sm text-red-500 font-semibold hover:text-red-700"
          >
            Logout
          </button>
        }
      />

      <div className="max-w-4xl mx-auto mt-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          Transactions for {user?.name || "User"} 💼
        </h1>
        <p className="text-gray-600">View and manage all your financial records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
        <SummaryCard title="Income" value={`₹${income}`} color="text-green-600" bg="bg-green-100" />
        <SummaryCard title="Expense" value={`₹${expense}`} color="text-red-600" bg="bg-red-100" />
        <SummaryCard title="Balance" value={`₹${balance}`} color="text-indigo-600" bg="bg-indigo-100" />
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-4 flex flex-col md:flex-row justify-between gap-3">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "all"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "income"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("income")}
          >
            Income
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "expense"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("expense")}
          >
            Expense
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-lg">
        {filteredTransactions.length > 0 ? (
          <TransactionList transactions={filteredTransactions} onDelete={deleteTransaction} />
        ) : (
          <p className="text-gray-500 text-center py-8">No transactions found.</p>
        )}
      </div>

      <footer className="text-center mt-10 text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} BudgetBuddy — Smart expense tracking.
      </footer>
    </div>
  );
}
