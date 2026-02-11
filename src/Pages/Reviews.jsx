import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getReviews, deleteReview } from "../services/reviewService";
import { API_BASE_URL } from "../config/apiConfig";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(id);
      toast.success("Review deleted");
      loadReviews();
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-semibold">
              All Reviews
            </h1>

            <button
              onClick={() => navigate("/add-review")}
              className="mt-3 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add New Review
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Role</th>
                    <th className="border px-3 py-2">Rating</th>
                    <th className="border px-3 py-2">Message</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">{r.name}</td>
                      <td className="border px-3 py-2">{r.role}</td>
                      <td className="border px-3 py-2">
                        {"⭐".repeat(r.rating)}
                      </td>
                      <td className="border px-3 py-2 max-w-xs truncate">
                        {r.message}
                      </td>
                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/edit-review/${r.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
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

export default Reviews;
