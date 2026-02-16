import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Overlay (Mobile Only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-30
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 text-xl font-bold text-slate-800 border-b flex justify-between items-center">
          Vivacious Admin
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Menu */}
        <nav className="flex-1 overflow-y-auto mt-6 flex flex-col px-4 space-y-1">
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/queries", label: "Query List" },
            { to: "/services", label: "Services" },
            {to: "/offline-services" ,label:"Our Offline Services"},
            { to: "/reviews", label: "⭐ All Reviews" },
            { to: "/team", label: "Team Members" },
            { to: "/projects", label: "Our Projects" },
            { to: "/blogs", label: "Our Blogs" },
            { to: "/pricing", label: "Our Pricing Plans" },
            { to: "/partners", label: "Our Partners" },
            { to: "/history", label: "Our History" },
            { to: "/faq", label: "FAQs" },
            { to: "/settings", label: "Settings" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-slate-400 border-t">
          © 2026 Vivacious Solutions
        </div>
      </div>
    </>
  );
}
