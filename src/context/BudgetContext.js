// src/context/BudgetContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData, updateData } from "../api/jsonBinAPI";

// Create Context
const BudgetContext = createContext();

// Provider
export const BudgetProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("bb_user")) || null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Load transactions from JSONBin for the logged-in user
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const allData = await fetchData();
        const userData = allData.find((u) => u.email === user.email);
        setTransactions(userData?.transactions || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load data from JSONBin");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  // 💾 Sync updated transactions to JSONBin
  const syncTransactions = async (newTransactions) => {
    if (!user) return;
    setTransactions(newTransactions);
    try {
      const allData = await fetchData();
      const updatedData = allData.map((u) =>
        u.email === user.email ? { ...u, transactions: newTransactions } : u
      );
      await updateData(updatedData);
    } catch (err) {
      console.error("Error syncing data to JSONBin:", err);
      setError("Failed to sync with JSONBin");
    }
  };

  // ➕ Add a new transaction
  const addTransaction = (t) => {
    const newList = [{ id: Date.now(), ...t }, ...transactions];
    syncTransactions(newList);
  };

  // ❌ Delete a transaction
  const deleteTransaction = (id) => {
    const newList = transactions.filter((t) => t.id !== id);
    syncTransactions(newList);
  };

  // 🚪 Logout function
  const logout = () => {
    localStorage.removeItem("bb_user");
    setUser(null);
    setTransactions([]);
  };

  const value = {
    user,
    setUser,
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    logout,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

// Custom hook to use context
export const useBudget = () => useContext(BudgetContext);
