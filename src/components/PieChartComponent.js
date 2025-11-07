import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PieChartComponent({ transactions }) {
  // 🎨 Colors: Income = green, Expense = red, Balance = indigo
  const COLORS = ["#10B981", "#EF4444", "#6366F1"];

  // 🧮 Compute totals
  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const expense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = income - expense;

  // 🧾 Prepare chart data
  const data = useMemo(() => {
    return [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
      { name: "Balance", value: balance },
    ];
  }, [income, expense, balance]);

  // 🧍 If no financial data
  if (income === 0 && expense === 0 && balance === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No financial data available yet.
      </div>
    );
  }

  return (
    <div className="w-full h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius="50%"
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip and Legend */}
          <Tooltip
            formatter={(value, name) => [`₹${value}`, name]}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* 💰 Summary */}
      <div className="mt-4 text-center text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold text-green-600">Income:</span> ₹{income}
        </p>
        <p>
          <span className="font-semibold text-red-600">Expense:</span> ₹{expense}
        </p>
        <p>
          <span className="font-semibold text-indigo-600">Balance:</span> ₹{balance}
        </p>
      </div>
    </div>
  );
}
