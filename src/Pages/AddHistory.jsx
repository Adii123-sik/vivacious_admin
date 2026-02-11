import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const AddHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const fileRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    year: "",
    subtitle: "",
    title: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* LOAD FOR EDIT */
  useEffect(() => {
    if (!isEdit) return;

    const loadHistory = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/history/${id}`
        );

        setForm({
          year: data.year || "",
          subtitle: data.subtitle || "",
          title: data.title || "",
          description: data.description || "",
        });

        if (data.image) {
          setPreview(data.image);
        }
      } catch {
        toast.error("Failed to load history");
      }
    };

    loadHistory();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.year || !form.title) {
      toast.error("Year and Title are required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/history/${id}`,
          fd
        );
        toast.success("History updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/history`,
          fd
        );
        toast.success("History added");
      }

      navigate("/history");
    } catch {
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

        <main className="pt-20 px-4 md:px-10">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? "Edit History" : "Add History"}
          </h1>

          <div className="max-w-2xl bg-white rounded-xl shadow p-6">
            {/* IMAGE */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                History Image
              </label>

              <div
                onClick={() => fileRef.current.click()}
                className="w-full h-48 border-2 border-dashed rounded-lg
                flex items-center justify-center cursor-pointer
                overflow-hidden bg-gray-50"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">
                    Click to upload image
                  </span>
                )}
              </div>

              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Year (e.g. 2011)"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Subtitle (e.g. Started in Agra)"
                value={form.subtitle}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="input"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="input"
                rows="4"
              />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600
                text-white px-6 py-2 rounded"
              >
                {loading ? "Saving..." : "Save History"}
              </button>
            </form>
          </div>
        </main>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #cbd5e1;
          padding: 10px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default AddHistory;
