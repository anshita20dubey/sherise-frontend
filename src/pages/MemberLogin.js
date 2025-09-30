import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import api from "../dashboard/utils/api"; // ✅ axios instance

const MemberLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ API call to backend
      const res = await api.post("/auth/login", credentials);

      // ✅ save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // ✅ redirect by role
      const role = res.data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "operator") navigate("/operator");
      else if (role === "enabler") navigate("/enabler");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 mt-12 md:p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="bg-[#48d494]/10 p-6 border-b border-gray-800">
              <h1 className="text-2xl font-bold text-center text-[#48d494]">
                Member Login
              </h1>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <p className="text-red-500">{error}</p>}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#48d494] hover:bg-[#48d494]/90 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-all"
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberLogin;
