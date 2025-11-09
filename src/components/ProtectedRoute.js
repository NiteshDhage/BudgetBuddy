import React from "react";
import { Navigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";

export default function ProtectedRoute({ children }) {
  const { user } = useBudget();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

