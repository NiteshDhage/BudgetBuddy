import React from "react";
import { Navigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";

export default function ProtectedRoute({ children }) {
  const { user } = useBudget();

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → render the protected page
  return children;
}
