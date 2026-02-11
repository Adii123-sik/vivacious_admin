import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import {API_BASE_URL} from "../config/apiConfig"

const AddReview = () => {
  const { id } = useParams(); // edit id
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const isEdit = Boolean(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    message: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= LOAD REVIEW (EDIT MODE) ================= */
  useEffect(() => {
    if (!isEdit) return;

    const loadReview = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/testimonials/${id}`
        );

        setForm({
          name: data.name || "",
          role: data.role || "",
          rating: Number(data.rating) || 5, // ✅ IMPORTANT
          message: data.message || "",
        });

        if (data.image) {
          setPreview(data.image);
        }
      } catch {
        toast.error("Failed to load review");
      }
    };

    loadReview();
  }, [id, isEdit]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.message) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("rating", Number(form.rating)); // ✅ FIX
      formData.append("message", form.message);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/testimonials/${id}`,
          formData
        );
        toast.success("Review updated successfully");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/testimonials`,
          formData
        );
        toast.success("Review added successfully");
      }

      navigate("/reviews");
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="pt-20 px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? "Edit Review" : "Add Review"}
          </h1>

          <div className="max-w-3xl bg-white rounded-xl shadow p-6 space-y-6">
            {/* IMAGE UPLOAD */}
            <div className="flex justify-center">
              <div
                onClick={() => fileRef.current.click()}
                className="w-28 h-28 rounded-full border-2 border-dashed
                border-slate-300 flex items-center justify-center
                cursor-pointer overflow-hidden hover:border-orange-500 transition"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Upload</span>
                )}
              </div>
              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Client Name *"
                className="input"
              />

              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role / Service *"
                className="input"
              />

              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="input"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Review message *"
                rows="4"
                className="input resize-none"
              />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600
                text-white px-6 py-2 rounded-md font-medium
                disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Review"
                  : "Add Review"}
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* styles */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 10px;
          font-size: 14px;
        }
        .input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 1px #f97316;
        }
      `}</style>
    </div>
  );
};

export default AddReview;
