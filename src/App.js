import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// 🧩 Context
import { BudgetProvider } from "./context/BudgetContext";

// 🔐 Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";

// 🧭 Pages
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BudgetProvider>
      <Router>
        <Routes>
          {/* 🏠 Default Route */}
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}

          {/* 🔑 Auth Pages */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* 💰 Protected Routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BudgetProvider>
  );
}

export default App;
