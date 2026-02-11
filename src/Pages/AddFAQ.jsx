import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const AddFAQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    sort_order: 0,
    status: 1,
  });

  /* LOAD FOR EDIT */
  useEffect(() => {
    if (!isEdit) return;

    const loadFaq = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/faq/${id}`
        );

        setForm({
          question: data.question || "",
          answer: data.answer || "",
          sort_order: data.sort_order || 0,
          status: data.status ?? 1,
        });
      } catch {
        toast.error("Failed to load FAQ");
      }
    };

    loadFaq();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.question || !form.answer) {
      toast.error("Question & Answer required");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/faq/${id}`,
          form
        );
        toast.success("FAQ updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/faq`,
          form
        );
        toast.success("FAQ added");
      }

      navigate("/faq");
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
            {isEdit ? "Edit FAQ" : "Add FAQ"}
          </h1>

          <div className="max-w-2xl bg-white rounded-xl shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Question"
                value={form.question}
                onChange={(e) =>
                  setForm({ ...form, question: e.target.value })
                }
                className="input"
              />

              <textarea
                placeholder="Answer"
                value={form.answer}
                onChange={(e) =>
                  setForm({ ...form, answer: e.target.value })
                }
                className="input"
                rows="4"
              />

              <input
                type="number"
                placeholder="Sort Order"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    sort_order: e.target.value,
                  })
                }
                className="input"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
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
                {loading ? "Saving..." : "Save FAQ"}
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

export default AddFAQ;
