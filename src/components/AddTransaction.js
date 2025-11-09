import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";

export default function AddTransaction() {
  const { addTransaction } = useBudget();

  const [form, setForm] = useState({
    desc: "",
    amount: "",
    type: "expense",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.desc || !form.amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      name: form.desc,
      amount: +form.amount,
      type: form.type,
      category: form.category || "General",
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction); 
    setForm({ desc: "", amount: "", type: "expense", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-4 bg-gray-50 p-4 rounded-2xl shadow-sm"
    >
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        type="text"
        placeholder="Category (optional)"
        className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        className="border p-2 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition font-semibold"
      >
        ➕ Add Transaction
      </button>
    </form>
  );
}

