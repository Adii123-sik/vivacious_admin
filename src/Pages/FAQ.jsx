import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const FAQ = () => {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const loadFaq = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/faq`);
      setFaq(data);
    } catch {
      toast.error("Failed to load FAQ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaq();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/faq/${id}`);
      toast.success("FAQ deleted");
      loadFaq();
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
              FAQ
            </h1>

            <button
              onClick={() => navigate("/faq/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add FAQ
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
                    <th className="border px-3 py-2">Question</th>
                    <th className="border px-3 py-2">Order</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {faq.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">
                        {f.question}
                      </td>

                      <td className="border px-3 py-2">
                        {f.sort_order}
                      </td>

                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/faq/edit/${f.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(f.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!faq.length && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-6 text-gray-400"
                      >
                        No FAQ found
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

export default FAQ;
