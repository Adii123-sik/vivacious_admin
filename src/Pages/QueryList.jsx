import React, { useEffect, useState } from "react";
import { getAllQueries, deleteQuery } from "../services/queryService";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/apiConfig";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // sidebar state (mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    try {
      const data = await getAllQueries();
      setQueries(data);
    } catch {
      toast.error("Failed to load queries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this query?")) return;

    try {
      await deleteQuery(id);
      toast.success("Query deleted");
      setQueries((prev) => prev.filter((q) => q.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Section */}
      <div className="md:ml-64">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="pt-20 px-3 sm:px-4 md:px-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Query List
          </h1>

          {loading ? (
            <p className="text-sm text-gray-500">Loading queries...</p>
          ) : queries.length === 0 ? (
            <p className="text-sm text-gray-500">No queries found</p>
          ) : (
            <div className="bg-white rounded-lg shadow">
              {/* 🔥 Responsive table wrapper */}
              <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full border-collapse text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-left">Name</th>
                      <th className="border px-3 py-2 text-left">Phone</th>
                      <th className="border px-3 py-2 text-left">Email</th>
                      <th className="border px-3 py-2 text-left">Message</th>
                      <th className="border px-3 py-2 text-left">Service</th>
                      <th className="border px-3 py-2 text-left">Source</th>
                      <th className="border px-3 py-2 text-left">Date</th>
                      <th className="border px-3 py-2 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {queries.map((q) => (
                      <tr
                        key={q.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="border px-3 py-2 whitespace-nowrap">
                          {q.name}
                        </td>

                        <td className="border px-3 py-2 whitespace-nowrap">
                          {q.phone}
                        </td>

                        <td className="border px-3 py-2">
                          {q.email || "-"}
                        </td>

                        <td className="border px-3 py-2 max-w-xs">
                          <p className="line-clamp-2 break-words">
                            {q.message}
                          </p>
                        </td>

                        <td className="border px-3 py-2 whitespace-nowrap">
                          {q.service || "-"}
                        </td>

                        <td className="border px-3 py-2 whitespace-nowrap capitalize">
                          {q.source}
                        </td>

                        <td className="border px-3 py-2 whitespace-nowrap">
                          {new Date(q.created_at).toLocaleString()}
                        </td>

                        <td className="border px-3 py-2 text-center">
                          <button
                            onClick={() => handleDelete(q.id)}
                            className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-xs transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* mobile hint */}
              <div className="md:hidden text-xs text-gray-400 px-3 py-2">
                👉 Scroll horizontally to see full table
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QueryList;
