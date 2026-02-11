import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import {API_BASE_URL} from "../config/apiConfig"

const AddPricing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]); // ✅ SERVICES LIST

  const [form, setForm] = useState({
    service_id: "",
    service_name: "",
    service_slug: "",
    plan_name: "",
    price: "",
    features: "",
  });

  /* ================= LOAD SERVICES ================= */
  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/services`
        );
        setServices(data || []);
      } catch {
        toast.error("Failed to load services");
      }
    };

    loadServices();
  }, []);

  /* ================= LOAD PRICING (EDIT) ================= */
  useEffect(() => {
    if (!isEdit) return;

    const loadPricing = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/pricing/${id}`
        );

        setForm({
          service_id: data.service_id || "",
          service_name: data.service_name || "",
          service_slug: data.service_slug || "",
          plan_name: data.plan_name || "",
          price: data.price || "",
          features: data.features || "",
        });
      } catch {
        toast.error("Failed to load pricing");
      }
    };

    loadPricing();
  }, [id, isEdit]);

  /* ================= SERVICE SELECT HANDLER ================= */
  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    const service = services.find(
      (s) => String(s.id) === selectedId
    );

    if (!service) return;

    setForm({
      ...form,
      service_id: service.id,
      service_name: service.service_name,
      service_slug: service.slug,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.service_id ||
      !form.plan_name ||
      !form.price
    ) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/pricing/${id}`,
          form
        );
        toast.success("Pricing updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/pricing`,
          form
        );
        toast.success("Pricing added");
      }

      navigate("/pricing");
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
            {isEdit ? "Edit Pricing Plan" : "Add Pricing Plan"}
          </h1>

          <div className="max-w-3xl bg-white rounded-xl shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ✅ SERVICE DROPDOWN */}
              <select
                value={form.service_id}
                onChange={handleServiceChange}
                className="input"
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.service_name}
                  </option>
                ))}
              </select>

              {/* 🔒 AUTO FILLED (READ ONLY) */}
              <input
                value={form.service_slug}
                readOnly
                placeholder="Service Slug"
                className="input bg-slate-100"
              />

              <input
                placeholder="Plan Name (Basic)"
                value={form.plan_name}
                onChange={(e) =>
                  setForm({ ...form, plan_name: e.target.value })
                }
                className="input"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="input"
              />

              <textarea
                placeholder="Features (one per line)"
                rows="6"
                value={form.features}
                onChange={(e) =>
                  setForm({ ...form, features: e.target.value })
                }
                className="input"
              />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                {loading ? "Saving..." : "Save Pricing"}
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

export default AddPricing;
