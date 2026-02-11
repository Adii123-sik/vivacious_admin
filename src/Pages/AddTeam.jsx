import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const AddTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const isEdit = Boolean(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* LOAD DATA FOR EDIT */
  useEffect(() => {
    if (!isEdit) return;

    const loadMember = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/team/${id}`
        );

        setForm({
          name: data.name || "",
          role: data.role || "",
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          instagram: data.instagram || "",
          linkedin: data.linkedin || "",
        });

        if (data.image) {
          setPreview(data.image);
        }
      } catch {
        toast.error("Failed to load member");
      }
    };

    loadMember();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("facebook", form.facebook);
      fd.append("twitter", form.twitter);
      fd.append("instagram", form.instagram);
      fd.append("linkedin", form.linkedin);

      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/team/${id}`,
          fd
        );
        toast.success("Member updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/team`,
          fd
        );
        toast.success("Member added");
      }

      navigate("/team");
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
            {isEdit ? "Edit Team Member" : "Add Team Member"}
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
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Role (e.g. Web Developer)"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Facebook URL"
                value={form.facebook}
                onChange={(e) =>
                  setForm({ ...form, facebook: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Twitter URL"
                value={form.twitter}
                onChange={(e) =>
                  setForm({ ...form, twitter: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Instagram URL"
                value={form.instagram}
                onChange={(e) =>
                  setForm({ ...form, instagram: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="LinkedIn URL"
                value={form.linkedin}
                onChange={(e) =>
                  setForm({ ...form, linkedin: e.target.value })
                }
                className="input"
              />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                {loading ? "Saving..." : "Save Member"}
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

export default AddTeam;
