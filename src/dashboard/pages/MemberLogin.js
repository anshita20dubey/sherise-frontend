import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../dashboard/utils/api";

export default function MemberLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // ✅ Save token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // ✅ Redirect based on role
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}
