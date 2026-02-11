import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/projects`
      );
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/projects/${id}`
      );
      toast.success("Project deleted");
      loadProjects();
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
              Projects
            </h1>

            <button
              onClick={() => navigate("/projects/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add New Project
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
                    <th className="border px-3 py-2">
                      Project Title
                    </th>
                    <th className="border px-3 py-2">
                      Category
                    </th>
                    <th className="border px-3 py-2">
                      Website
                    </th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-3 py-2">
                        {p.image ? (
                          <img
                            src={p.image}
                            className="w-12 h-12 rounded object-cover"
                            alt={p.title}
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </td>


                      <td className="border px-3 py-2">
                        {p.title}
                      </td>

                      <td className="border px-3 py-2">
                        {p.category}
                      </td>

                      <td className="border px-3 py-2">
                        {p.website_link && (
                          <a
                            href={p.website_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit
                          </a>
                        )}
                      </td>

                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/projects/edit/${p.id}`
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(p.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!projects.length && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400"
                      >
                        No projects found
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

export default Projects;
