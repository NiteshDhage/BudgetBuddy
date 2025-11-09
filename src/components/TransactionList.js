import React from "react";
import { useBudget } from "../context/BudgetContext";

export default function TransactionList({ transactions }) {
  const { deleteTransaction } = useBudget();

  if (!transactions || transactions.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No transactions recorded yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <div
          key={t.id}
          className={`flex justify-between items-center p-4 rounded-xl shadow-sm border-l-4 transition-all duration-200 hover:shadow-md ${
            t.type === "income"
              ? "border-green-400 bg-green-50"
              : "border-red-400 bg-red-50"
          }`}
        >
          <div>
            <h3 className="font-semibold text-gray-800">{t.name}</h3>
            <p className="text-sm text-gray-500">
              {t.category || "General"} •{" "}
              {new Date(t.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`font-semibold ${
                t.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.type === "income" ? "+" : "-"}₹{t.amount}
            </span>

            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

