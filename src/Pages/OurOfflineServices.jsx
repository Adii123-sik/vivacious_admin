import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const OurOfflineServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const loadServices = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/offline-services?admin=true`
      );
      setServices(data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/offline-services/${id}`
      );
      toast.success("Service deleted");
      loadServices();
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
              Our Offline Services
            </h1>

            <button
              onClick={() => navigate("/offline-services/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add Offline Service
            </button>
          </div>

          {/* TABLE */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Image</th>
                    <th className="border px-3 py-2">Title</th>
                    <th className="border px-3 py-2">Order</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">

                      {/* IMAGE PREVIEW */}
                      <td className="border px-3 py-2">
                        {s.image1 ? (
                          <img
                            src={s.image1}
                            alt={s.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </td>

                      <td className="border px-3 py-2">
                        <div className="font-medium">{s.title}</div>
                        {s.extra_content && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {s.extra_content}
                          </div>
                        )}
                      </td>

                      <td className="border px-3 py-2 text-center">
                        {s.display_order}
                      </td>

                      <td className="border px-3 py-2 text-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            s.is_active
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {s.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/offline-services/edit/${s.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(s.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!services.length && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400"
                      >
                        No Services Found
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

export default OurOfflineServices;
