import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const loadHistory = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/history`
      );
      setHistory(data);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this history entry?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/history/${id}`
      );
      toast.success("History deleted");
      loadHistory();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="pt-20 px-4 md:px-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-semibold">
              Our History
            </h1>

            <button
              onClick={() => navigate("/history/add")}
              className="bg-orange-500 hover:bg-orange-600
              text-white px-4 py-2 rounded text-sm"
            >
              + Add History
            </button>
          </div>

          {/* TABLE */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Image</th>
                    <th className="border px-3 py-2">Year</th>
                    <th className="border px-3 py-2">Title</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((h) => (
                    <tr key={h.id} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">
                        {h.image ? (
                          <img
                            src={h.image}
                            alt={h.title}
                            className="w-20 h-14 object-cover rounded-md border"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </td>

                      <td className="border px-3 py-2">
                        {h.year}
                      </td>

                      <td className="border px-3 py-2">
                        {h.title}
                      </td>

                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/history/edit/${h.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600
                          text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(h.id)}
                          className="bg-red-500 hover:bg-red-600
                          text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!history.length && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-400"
                      >
                        No history records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default History;
