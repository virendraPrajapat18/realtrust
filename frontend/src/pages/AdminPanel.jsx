// client/src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../api/authService";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaUsers,
  FaEnvelopeOpenText,
  FaRegNewspaper,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: <FaTachometerAlt size={18} />,
  },
  {
    to: "/admin/projects",
    label: "Projects",
    icon: <FaProjectDiagram size={18} />,
  },
  {
    to: "/admin/clients",
    label: "Clients",
    icon: <FaUsers size={18} />,
  },
  {
    to: "/admin/contacts",
    label: "Contacts",
    icon: <FaEnvelopeOpenText size={18} />,
  },
  {
    to: "/admin/subscribers",
    label: "Subscribers",
    icon: <FaRegNewspaper size={18} />,
  },
  {
    to: "/admin/users/add",
    label: "Add User",
    icon: <FaRegNewspaper size={18} />,
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (to) => location.pathname === to;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-white w-64 shadow-lg flex flex-col p-4 sm:static sm:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img
              src="../../public/logo.svg"
              alt="Logo"
              className="h-8 w-auto rounded"
            />
            <span className="font-bold text-lg text-blue-700">Admin Panel</span>
          </div>
          <button
            className="sm:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes size={22} />
          </button>
        </div>
        <nav className="flex flex-col space-y-2 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-4 py-2 rounded transition font-medium ${
                isActive(link.to)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 mt-8 rounded text-red-600 font-medium hover:bg-red-50 transition"
          >
            <FaSignOutAlt className="mr-3" size={18} />
            Logout
          </button>
        </nav>
        <div className="mt-auto text-xs text-gray-400 px-4 py-2">
          &copy; {new Date().getFullYear()} Real Trust Admin
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar for mobile */}
        <div className="sm:hidden flex items-center justify-between bg-white shadow px-4 py-3">
          <button
            className="text-gray-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FaBars size={22} />
          </button>
          <span className="font-bold text-blue-700">Admin Panel</span>
          <div className="w-6" /> {/* Spacer */}
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
