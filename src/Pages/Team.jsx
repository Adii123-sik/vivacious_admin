import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const loadTeam = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/team`);
      setTeam(data);
    } catch {
      toast.error("Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/team/${id}`);
      toast.success("Member deleted");
      loadTeam();
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
              Team Members
            </h1>

            <button
              onClick={() => navigate("/team/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add New Member
            </button>
          </div>

          {/* TABLE */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-[800px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Image</th>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Role</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {team.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">
                        {t.image ? (
                          <img
                            src={t.image}
                            className="w-10 h-10 rounded-full object-cover"
                            alt={t.name}
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>


                      <td className="border px-3 py-2">{t.name}</td>
                      <td className="border px-3 py-2">{t.role}</td>

                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/team/edit/${t.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(t.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Team;
