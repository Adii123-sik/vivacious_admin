import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/admin/logout`,
      {},
      { withCredentials: true }
    );

    navigate("/");
  } catch (error) {
    console.error("Logout failed", error);
  }
};


  

  return (
    <div
      className="
        fixed top-0 left-0 md:left-64 right-0 
        h-16 bg-white border-b border-slate-200 
        flex items-center justify-between 
        px-4 md:px-6 z-20
      "
    >
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden bg-orange-500 text-white p-2 rounded-md"
        >
          ☰
        </button>

        <h1 className="text-base md:text-lg font-semibold text-slate-800">
          Admin Dashboard
        </h1>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          bg-orange-500 text-white 
          px-3 py-1.5 md:px-4 md:py-2 
          rounded-md text-xs md:text-sm 
          font-medium hover:bg-orange-600 transition
        "
      >
        Logout
      </button>
    </div>
  );
}
