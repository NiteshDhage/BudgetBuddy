import React, { useState } from "react";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(4, "Min 4 characters")
    .max(12, "Max 12 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Must include capital, number & special symbol"
    ),
});

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // 🔐 Your JSONBin credentials
  const BIN_ID = "690cbda743b1c97be99cf966";
  const MASTER_KEY = "$2a$10$75ufuKZ3syLH/TbK6mdqcu7NDMT3BCSt/o/kbU5MS087q7iYvPstC";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input using zod
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((err) => (newErrors[err.path[0]] = err.message));
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setMessage("⌛ Registering...");

    try {
      // Fetch existing users
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY },
      });
      let users = [];
      if (res.ok) {
        const data = await res.json();
        users = data.record || [];
      }

      // Check if user already exists
      if (users.find((u) => u.email === formData.email)) {
        setMessage("⚠ Email already registered!");
        return;
      }

      // Hash password before saving
      const hashedPassword = bcrypt.hashSync(formData.password, 10);

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
      };

      const updatedData = [...users, newUser];

      // Save to JSONBin
      const saveRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(updatedData),
      });

      if (saveRes.ok) {
        // Save current user locally
        localStorage.setItem("bb_user", JSON.stringify(newUser));
        setMessage("✅ Registration successful!");
        // Redirect directly to /app
        navigate("/app");
      } else {
        setMessage("❌ Failed to save data. Check Bin ID or key.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠ Network or permission error.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          🧾 BudgetBuddy Register
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="border w-full p-2 rounded mb-2"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="border w-full p-2 rounded mb-2"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="border w-full p-2 rounded mb-2"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already registered?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 underline font-semibold"
          >
            Login
          </button>
        </p>

        <p className="mt-3 text-center">{message}</p>
      </div>
    </div>
  );
}

export default RegisterForm;
