import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../utils/api";
import { LayoutDashboard, ClipboardList, CheckCircle } from "lucide-react";

const EnablerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [activeTab, setActiveTab] = useState("cases"); // cases | overview

  const fetchCases = async () => {
    const res = await api.get("/enabler/my-cases");
    setCases(res.data);
  };

  const acceptCase = async (id) => {
    await api.post(`/enabler/accept/${id}`);
    fetchCases();
  };

  const updateCase = async (id, status) => {
    await api.post(`/enabler/update/${id}`, { status });
    fetchCases();
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/80 border-r border-gray-700 hidden md:flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-10">Enabler</h2>
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === "overview"
                  ? "bg-[#48d494] text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <LayoutDashboard size={20} /> Overview
            </button>
            <button
              onClick={() => setActiveTab("cases")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === "cases"
                  ? "bg-[#48d494] text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <ClipboardList size={20} /> My Cases
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">Enabler Dashboard</h2>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <section>
              <h3 className="text-xl font-semibold mb-6">Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                  <h4 className="text-lg font-bold">Total Cases</h4>
                  <p className="text-2xl font-extrabold text-[#48d494] mt-2">
                    {cases.length}
                  </p>
                </div>
                <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                  <h4 className="text-lg font-bold">Completed</h4>
                  <p className="text-2xl font-extrabold text-green-400 mt-2">
                    {cases.filter((c) => c.status === "Completed").length}
                  </p>
                </div>
                <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                  <h4 className="text-lg font-bold">Pending</h4>
                  <p className="text-2xl font-extrabold text-yellow-400 mt-2">
                    {cases.filter((c) => c.status === "Pending").length}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Cases Tab */}
          {activeTab === "cases" && (
            <section>
              <h3 className="text-xl font-semibold mb-6">My Cases</h3>
              {cases.length === 0 ? (
                <p className="text-gray-400">No cases assigned yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cases.map((c) => (
                    <div
                      key={c._id}
                      className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition"
                    >
                      <h3 className="text-lg font-bold mb-2">{c.question}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Deadline:{" "}
                        {c.deadline
                          ? new Date(c.deadline).toLocaleDateString()
                          : "Not set"}
                      </p>
                      <p className="text-sm text-[#48d494] mb-4">
                        Status: {c.status}
                      </p>
                      <div className="flex gap-2">
                        {c.status === "Pending" && (
                          <button
                            onClick={() => acceptCase(c._id)}
                            className="flex items-center gap-2 bg-[#48d494] text-black px-3 py-1 rounded text-sm font-medium hover:scale-105 transition"
                          >
                            Accept
                          </button>
                        )}
                        {c.status !== "Completed" && (
                          <button
                            onClick={() => updateCase(c._id, "Completed")}
                            className="flex items-center gap-2 bg-blue-500 px-3 py-1 rounded text-sm font-medium hover:scale-105 transition"
                          >
                            <CheckCircle size={16} /> Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default EnablerDashboard;
