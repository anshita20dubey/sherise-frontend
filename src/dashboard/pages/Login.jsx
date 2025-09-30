import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "operator") navigate("/operator");
      else if (res.data.user.role === "enabler") navigate("/enabler");
      else navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-28 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg">
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 bg-gray-800 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 bg-gray-800 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-[#48d494] text-black rounded hover:bg-[#34b37a]"
          >
            Login
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
