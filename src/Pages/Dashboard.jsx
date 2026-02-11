import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/apiConfig";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="pt-20 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
            Welcome Admin 👋
          </h2>

          <p className="text-gray-600">
            This is your admin dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
