import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../utils/api";
import { Users, UserPlus, CheckCircle, Shield } from "lucide-react";

const AdminDashboard = () => {
  const [pendingEnablers, setPendingEnablers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "operator",
  });

  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "create"

  const fetchPending = async () => {
    const res = await api.get("/admin/pending-enablers");
    setPendingEnablers(res.data);
  };

  const approveEnabler = async (id) => {
    await api.post(`/admin/approve-enabler/${id}`);
    fetchPending();
  };

  const createUser = async () => {
    await api.post("/admin/create-user", newUser);
    alert("User created successfully");
    setNewUser({ name: "", email: "", password: "", role: "operator" });
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/80 border-r border-gray-700 hidden md:flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-10">Admin</h2>
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === "pending"
                  ? "bg-[#48d494] text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <Users size={20} /> Pending Requests
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === "create"
                  ? "bg-[#48d494] text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <UserPlus size={20} /> Create User
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">Admin Dashboard</h2>

          {/* Pending Requests */}
          {activeTab === "pending" && (
            <section>
              <h3 className="text-xl font-semibold mb-6">
                Pending Enabler Requests
              </h3>
              {pendingEnablers.length === 0 ? (
                <p className="text-gray-400">No pending requests 🎉</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingEnablers.map((e) => (
                    <div
                      key={e._id}
                      className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition"
                    >
                      <h3 className="text-lg font-bold">{e.name}</h3>
                      <p className="text-gray-400 mb-3">{e.email}</p>
                      <button
                        onClick={() => approveEnabler(e._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#48d494] to-[#34b37a] text-black font-semibold rounded-lg hover:scale-105 transition-transform shadow-md"
                      >
                        <CheckCircle size={18} /> Approve
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Create User */}
          {activeTab === "create" && (
            <section className="max-w-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <UserPlus size={22} className="text-[#48d494]" /> Create New
                User
              </h3>

              <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full mb-4 px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-4 px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-4 px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                <select
                  className="w-full mb-6 px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48d494] transition"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="operator">Operator</option>
                  <option value="enabler">Enabler</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={createUser}
                  className="w-full py-3 bg-gradient-to-r from-[#48d494] to-[#34b37a] text-black font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg"
                >
                  Create User
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
