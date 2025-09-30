import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../utils/api";
import { LayoutDashboard, ClipboardList, BarChart2 } from "lucide-react";

const OperatorDashboard = () => {
  const [cases, setCases] = useState([]);
  const [enablers, setEnablers] = useState([]);
  const [reports, setReports] = useState(null);
  const [activeTab, setActiveTab] = useState("cases"); // cases | reports | overview
  const [error, setError] = useState(null);

  // Fetch Cases
  const fetchCases = async () => {
    try {
      const res = await api.get("/operator/cases");
      setCases(res.data);
    } catch (err) {
      setError("Failed to fetch cases");
    }
  };

  // Fetch Enablers
  const fetchEnablers = async () => {
    try {
      const res = await api.get("/operator/enablers");
      setEnablers(res.data);
    } catch (err) {
      setError("Failed to fetch enablers");
    }
  };

  // Fetch Reports
  const fetchReports = async () => {
    try {
      const res = await api.get("/operator/reports");
      setReports(res.data);
    } catch (err) {
      // If 404, just skip instead of crashing
      if (err.response?.status === 404) {
        setReports(null);
      } else {
        setError("Failed to fetch reports");
      }
    }
  };

  // Assign Case
  const assignCase = async (caseId, enablerId) => {
    try {
      await api.post(`/operator/assign/${caseId}`, { enablerId });
      fetchCases();
    } catch (err) {
      alert("Failed to assign case");
    }
  };

  useEffect(() => {
    fetchCases();
    fetchEnablers();
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/80 border-r border-gray-700 hidden md:flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-10">Operator</h2>
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("cases")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === "cases"
                  ? "bg-[#48d494] text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <ClipboardList size={20} /> Cases
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === "reports"
                  ? "bg-[#48d494] text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <BarChart2 size={20} /> Reports
            </button>
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">Operator Dashboard</h2>

          {error && (
            <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded mb-6">
              {error}
            </div>
          )}

          {/* Cases Tab */}
          {activeTab === "cases" && (
            <section>
              <h3 className="text-xl font-semibold mb-6">Help Requests</h3>
              {cases.length === 0 ? (
                <p className="text-gray-400">No cases available</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {cases.map((c) => (
                    <div
                      key={c._id}
                      className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700"
                    >
                      <h3 className="text-lg font-bold mb-2">{c.question}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        From: {c.requesterName} ({c.requesterEmail})
                      </p>
                      <p className="text-sm text-[#48d494] mb-4">
                        Status: {c.status}
                      </p>
                      <select
                        onChange={(e) => assignCase(c._id, e.target.value)}
                        className="bg-gray-800 px-3 py-2 rounded text-sm w-full"
                      >
                        <option value="">Assign Enabler</option>
                        {enablers.map((e) => (
                          <option key={e._id} value={e._id}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <section>
              <h3 className="text-xl font-semibold mb-6">Reports</h3>
              {!reports ? (
                <p className="text-gray-400">No reports available</p>
              ) : (
                <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                  <p>
                    Open/Pending Cases:{" "}
                    <span className="text-[#48d494]">
                      {reports.openPending}
                    </span>
                  </p>
                  <p>
                    Past Deadlines:{" "}
                    <span className="text-red-400">
                      {reports.pastDeadlines.length}
                    </span>
                  </p>
                  <h4 className="text-lg font-bold mt-4">
                    Enabler Performance
                  </h4>
                  {reports.enablerPerformance.map((perf) => (
                    <div key={perf._id} className="mt-2 text-sm">
                      {perf.enabler?.name} - Completed: {perf.completedCount} /{" "}
                      {perf.totalAssigned}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

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
                  <h4 className="text-lg font-bold">Total Enablers</h4>
                  <p className="text-2xl font-extrabold text-blue-400 mt-2">
                    {enablers.length}
                  </p>
                </div>
                <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                  <h4 className="text-lg font-bold">Reports Available</h4>
                  <p className="text-2xl font-extrabold text-yellow-400 mt-2">
                    {reports ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OperatorDashboard;
