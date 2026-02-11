import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/apiConfig";
import {
  getReviewById,
  updateReview,
} from "../services/reviewService";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    image: "",
    message: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    loadReview();
  }, []);

  const loadReview = async () => {
    try {
      const data = await getReviewById(id);
      setForm(data);
      setPreview(data.image || null);
    } catch {
      toast.error("Failed to load review");
      navigate("/reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setForm({ ...form, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.message) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      const payload =
        form.image instanceof File
          ? (() => {
              const fd = new FormData();
              Object.keys(form).forEach((k) =>
                fd.append(k, form[k])
              );
              return fd;
            })()
          : form;

      await updateReview(id, payload);

      toast.success("✅ Review updated");
      navigate("/reviews");
    } catch {
      toast.error("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="pt-20 px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold mb-6">Edit Review</h1>

          <div className="max-w-3xl bg-white rounded-xl shadow border">
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6"
            >
              {/* IMAGE */}
              <div className="flex justify-center">
                <div
                  onClick={() => fileRef.current.click()}
                  className="w-28 h-28 rounded-full border-2 border-dashed
                  flex items-center justify-center cursor-pointer
                  hover:border-orange-500 transition bg-slate-50"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-slate-400">
                      Upload Image
                    </span>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageSelect}
                />
              </div>

              {/* FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Client Name"
                  className="border rounded px-3 py-2"
                />

                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Service / Role"
                  className="border rounded px-3 py-2"
                />

                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Review message"
                className="border rounded px-3 py-2 w-full"
              />

              {/* ACTIONS */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600
                  text-white px-6 py-2 rounded"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/reviews")}
                  className="border px-6 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditReview;
