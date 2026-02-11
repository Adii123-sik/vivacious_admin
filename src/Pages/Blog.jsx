import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const loadBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/blogs`
      );
      setBlogs(data);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/blogs/${id}`
      );
      toast.success("Blog deleted");
      loadBlogs();
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
              Blogs
            </h1>

            <button
              onClick={() => navigate("/blogs/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add New Blog
            </button>
          </div>

          {/* TABLE */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-[1000px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Image</th>
                    <th className="border px-3 py-2">Title</th>
                    <th className="border px-3 py-2">Category</th>
                    <th className="border px-3 py-2">Author</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {blogs.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-3 py-2">
                        {b.image ? (
                          <img
                            src={b.image}
                            className="w-12 h-12 rounded object-cover"
                            alt={b.title || "Blog image"}
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No Image</span>
                        )}
                      </td>


                      <td className="border px-3 py-2">
                        {b.title}
                      </td>

                      <td className="border px-3 py-2">
                        {b.category}
                      </td>

                      <td className="border px-3 py-2">
                        {b.author}
                      </td>

                      <td className="border px-3 py-2">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/blogs/edit/${b.id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(b.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}

                  {!blogs.length && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400"
                      >
                        No blogs found
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

export default Blog;
