import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaUsers,
  FaEnvelopeOpenText,
  FaRegNewspaper,
} from "react-icons/fa";
import axios from "../../api/axios";

const stats = [
  {
    key: "projects",
    label: "Projects",
    icon: <FaProjectDiagram size={28} className="text-blue-600" />,
    link: "/admin/projects",
    color: "bg-blue-50 text-blue-700",
  },
  {
    key: "clients",
    label: "Clients",
    icon: <FaUsers size={28} className="text-green-600" />,
    link: "/admin/clients",
    color: "bg-green-50 text-green-700",
  },
  {
    key: "contacts",
    label: "Contacts",
    icon: <FaEnvelopeOpenText size={28} className="text-orange-500" />,
    link: "/admin/contacts",
    color: "bg-orange-50 text-orange-700",
  },
  {
    key: "subscribers",
    label: "Subscribers",
    icon: <FaRegNewspaper size={28} className="text-purple-600" />,
    link: "/admin/subscribers",
    color: "bg-purple-50 text-purple-700",
  },
];

const DashboardHome = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projects, clients, contacts, subscribers] = await Promise.all([
          axios.get("/projects"),
          axios.get("/clients"),
          axios.get("/contacts"),
          axios.get("/subscribers"),
        ]);
        setCounts({
          projects: projects.data.length,
          clients: clients.data.length,
          contacts: contacts.data.length,
          subscribers: subscribers.data.length,
        });
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading summary...</p>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map(({ key, label, icon, color }) => (
              <div
                key={key}
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-6 rounded-lg shadow-sm overflow-hidden ${color}`}
              >
                <div className="p-3 bg-white rounded-full shadow flex-shrink-0">
                  {icon}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl md:text-3xl font-bold leading-none">
                    {counts[key]}
                  </p>
                  <p className="font-medium break-words">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick navigation */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ key, label, icon, link, color }) => (
              <Link
                key={key}
                to={link}
                className={`flex items-center px-5 py-4 rounded-lg font-semibold transition ${color} shadow-sm border border-transparent hover:border-blue-300`}
              >
                <span className="mr-3">{icon}</span>
                <span>Manage {label}</span>
              </Link>
            ))}

            {/* Add New User Link */}
            <Link
              to="/admin/users/add"
              className="flex items-center px-5 py-4 rounded-lg font-semibold bg-indigo-50 text-indigo-700 shadow-sm border border-transparent hover:border-indigo-300"
            >
              <span className="mr-3 text-xl">+</span>
              <span>Add New User</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
