import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../utils/api";
import { User, Mail, Lock, Shield } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "enabler",
  });

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully. Please login.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 pt-32">
        <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center mb-8">
            {" "}
            Create Account
          </h2>

          {/* Name */}
          <div className="relative mb-5">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative mb-5">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Role */}
          <div className="relative mb-6">
            <Shield className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="enabler">Enabler</option>
              <option value="operator">Operator</option>
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            className="w-full py-3 bg-gradient-to-r from-[#48d494] to-[#34b37a] text-black font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            Register
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
