import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const loadPricing = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/pricing`
      );
      setPlans(data);
    } catch {
      toast.error("Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pricing plan?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/pricing/${id}`
      );
      toast.success("Pricing plan deleted");
      loadPricing();
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
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-semibold">
              Pricing Plans
            </h1>

            <button
              onClick={() => navigate("/pricing/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              + Add New Pricing
            </button>
          </div>

          {/* TABLE */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Service</th>
                    <th className="border px-3 py-2">Plan</th>
                    <th className="border px-3 py-2">Price</th>
                    <th className="border px-3 py-2">Slug</th>
                    <th className="border px-3 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {plans.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">
                        {p.service_name}
                      </td>

                      <td className="border px-3 py-2">
                        {p.plan_name}
                      </td>

                      <td className="border px-3 py-2">
                        ₹ {p.price}
                      </td>

                      <td className="border px-3 py-2">
                        {p.service_slug}
                      </td>

                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/pricing/edit/${p.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!plans.length && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400"
                      >
                        No pricing plans found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Pricing;
