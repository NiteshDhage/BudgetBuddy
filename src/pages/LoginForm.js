import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  // 🔐 JSONBin credentials
 const BIN_ID = "690cbda743b1c97be99cf966";
  const MASTER_KEY = "$2a$10$75ufuKZ3syLH/TbK6mdqcu7NDMT3BCSt/o/kbU5MS087q7iYvPstC";




  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("🔍 Verifying credentials...");

    try {
      // Fetch user data from JSONBin
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await res.json();
      const users = data.record || [];

      // Find user by email
      const user = users.find((u) => u.email === form.email);
      if (!user) {
        setMessage("❌ No account found with that email.");
        return;
      }

      // Compare password using bcrypt
      const isMatch = bcrypt.compareSync(form.password, user.password);
      if (!isMatch) {
        setMessage("⚠ Incorrect password.");
        return;
      }

      // ✅ Save login session
      localStorage.setItem("bb_user", JSON.stringify(user));
      setMessage("✅ Login successful!");
      navigate("/app");
    } catch (err) {
      console.error(err);
      setMessage("⚠ Network or permission error.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          🔐 Login to BudgetBuddy
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="border w-full p-2 rounded mb-2"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="border w-full p-2 rounded mb-2"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 underline font-semibold"
          >
            Register
          </button>
        </p>

        <p className="mt-3 text-center text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default LoginForm;
