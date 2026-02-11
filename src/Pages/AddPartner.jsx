import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/apiConfig";

import {
  addPartner,
  updatePartner,
  getPartnerById,
} from "../services/partnerService";

const AddPartner = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* LOAD PARTNER FOR EDIT */
  useEffect(() => {
    if (!isEdit) return;

    const loadPartner = async () => {
      try {
        const data = await getPartnerById(id);
        setName(data.name || "");
        if (data.logo) {
          setPreview(data.logo);
        }
      } catch {
        toast.error("Failed to load partner");
      }
    };

    loadPartner();
  }, [id, isEdit]);

  /* CLEAN PREVIEW URL */
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Partner name required");
      return;
    }

    if (!isEdit && !imageFile) {
      toast.error("Partner logo required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", name);
      if (imageFile) fd.append("logo", imageFile);

      if (isEdit) {
        await updatePartner(id, fd);
        toast.success("Partner updated");
      } else {
        await addPartner(fd);
        toast.success("Partner added");
      }

      navigate("/partners");
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
            {isEdit ? "Edit Partner" : "Add Partner"}
          </h1>

          <div className="max-w-xl bg-white rounded-xl shadow p-6">
            {/* IMAGE PREVIEW (RECTANGULAR) */}
            <div className="mb-6">
              <div
                onClick={() => fileRef.current.click()}
                className="w-full h-48 border-2 border-dashed
                border-gray-300 rounded-md
                flex items-center justify-center
                cursor-pointer bg-gray-50 overflow-hidden"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Partner Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    Click to upload partner logo
                  </span>
                )}
              </div>

              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Partner Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600
                text-white px-6 py-2 rounded"
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Partner"
                  : "Save Partner"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPartner;
