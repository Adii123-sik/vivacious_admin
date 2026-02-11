import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import {API_BASE_URL} from "../config/apiConfig"

const AddProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const isEdit = Boolean(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    website_link: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* LOAD PROJECT FOR EDIT */
  useEffect(() => {
    if (!isEdit) return;

    const loadProject = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/projects/${id}`
        );

        setForm({
          title: data.title || "",
          category: data.category || "",
          website_link: data.website_link || "",
        });

        if (data.image) {
          setPreview(data.image)
        }
      } catch {
        toast.error("Failed to load project");
      }
    };

    loadProject();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.website_link) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("website_link", form.website_link);

      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/projects/${id}`,
          fd
        );
        toast.success("Project updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/projects`,
          fd
        );
        toast.success("Project added");
      }

      navigate("/projects");
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
            {isEdit ? "Edit Project" : "Add Project"}
          </h1>

          <div className="max-w-2xl bg-white rounded-xl shadow p-6">
            {/* IMAGE */}
            <div className="flex justify-center mb-6">
              <div
                onClick={() => fileRef.current.click()}
                className="w-28 h-28 rounded-full border-2 border-dashed
                flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <span className="text-gray-400">Upload</span>
                )}
              </div>
              <input
                type="file"
                hidden
                ref={fileRef}
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Project Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Category (e.g. Web Development)"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Website Link"
                value={form.website_link}
                onChange={(e) =>
                  setForm({ ...form, website_link: e.target.value })
                }
                className="input"
              />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                {loading ? "Saving..." : "Save Project"}
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

export default AddProject;
