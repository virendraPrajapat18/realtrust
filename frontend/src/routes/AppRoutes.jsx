import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import AdminLogin from "../pages/AdminLogin";
import DashboardLayout from "../pages/AdminPanel";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Projects from "../pages/dashboard/Projects";
import Clients from "../pages/dashboard/Clients";
import Contacts from "../pages/dashboard/Contacts";
import Subscribers from "../pages/dashboard/Subscribers";
import AddUser from "../pages/dashboard/AddUser";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "projects", element: <Projects /> },
      { path: "clients", element: <Clients /> },
      { path: "contacts", element: <Contacts /> },
      { path: "subscribers", element: <Subscribers /> },
      { path: "users/add", element: <AddUser /> },
    ],
  },
]);

export default router;
