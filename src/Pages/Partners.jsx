import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const loadPartners = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/partners`);
      setPartners(data);
    } catch {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/partners/${id}`);
      toast.success("Partner deleted");
      loadPartners();
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Our Partners</h1>

            <button
              onClick={() => navigate("/partners/add")}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              + Add New Partner
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Logo</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p) => (
                    <tr key={p.id}>
                      <td className="border p-2">
                        {p.logo ? (
                          <img
                            src={p.logo}
                            className="w-14 h-14 object-contain"
                            alt={p.name}
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No Logo</span>
                        )}
                      </td>

                      <td className="border p-2">{p.name}</td>
                      <td className="border p-2 text-center space-x-2">
                        <button
                          onClick={() => navigate(`/partners/edit/${p.id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!partners.length && (
                    <tr>
                      <td colSpan="3" className="text-center py-6">
                        No partners found
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

export default Partners;
