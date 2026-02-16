import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const AddOfflineService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    extra_content: "",
    image1: null,
    image2: null,
    image3: null,
    display_order: 0,
    is_active: 1,
  });

  /* ================= LOAD FOR EDIT ================= */
  useEffect(() => {
    if (!isEdit) return;

    const loadService = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/offline-services?admin=true`
        );

        const service = data.find((s) => s.id === Number(id));

        if (service) {
          setForm({
            title: service.title || "",
            description: service.description || "",
            extra_content: service.extra_content || "",
            image1: service.image1 || null,
            image2: service.image2 || null,
            image3: service.image3 || null,
            display_order: service.display_order || 0,
            is_active: service.is_active ?? 1,
          });
        }
      } catch {
        toast.error("Failed to load service");
      }
    };

    loadService();
  }, [id, isEdit]);

  /* ================= HANDLE FILE ================= */
  const handleFile = (key, file) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error("Title & Description required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("extra_content", form.extra_content);
      formData.append("display_order", form.display_order);
      formData.append("is_active", form.is_active);

      if (form.image1) formData.append("image1", form.image1);
      if (form.image2) formData.append("image2", form.image2);
      if (form.image3) formData.append("image3", form.image3);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/offline-services/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Service updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/offline-services`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Service added");
      }

      navigate("/offline-services");
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
            {isEdit ? "Edit Offline Service" : "Add Offline Service"}
          </h1>

          <div className="max-w-2xl bg-white rounded-xl shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">

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
                  setForm({ ...form, description: e.target.value })
                }
                rows="5"
                className="input"
              />

              <textarea
                placeholder="Extra Content"
                value={form.extra_content}
                onChange={(e) =>
                  setForm({ ...form, extra_content: e.target.value })
                }
                rows="4"
                className="input"
              />

              {/* IMAGE 1 */}
              <ImagePreview file={form.image1} />
              <input
                type="file"
                onChange={(e) =>
                  handleFile("image1", e.target.files[0])
                }
              />

              {/* IMAGE 2 */}
              <ImagePreview file={form.image2} />
              <input
                type="file"
                onChange={(e) =>
                  handleFile("image2", e.target.files[0])
                }
              />

              {/* IMAGE 3 */}
              <ImagePreview file={form.image3} />
              <input
                type="file"
                onChange={(e) =>
                  handleFile("image3", e.target.files[0])
                }
              />

              <input
                type="number"
                placeholder="Display Order"
                value={form.display_order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    display_order: e.target.value,
                  })
                }
                className="input"
              />

              <select
                value={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: Number(e.target.value) })
                }
                className="input"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                {loading ? "Saving..." : "Save Service"}
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

/* IMAGE PREVIEW */
const ImagePreview = ({ file }) => {
  if (!file) return null;

  const src =
    typeof file === "string"
      ? file
      : URL.createObjectURL(file);

  return (
    <img
      src={src}
      alt="preview"
      className="w-40 mb-2 border rounded"
    />
  );
};

export default AddOfflineService;
