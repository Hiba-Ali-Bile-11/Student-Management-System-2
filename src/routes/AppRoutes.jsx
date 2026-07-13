import {Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import DashStatus from "../pages/DashStatus";
import Student from "../pages/Student";
import Department from "../pages/Department";
import Course from "../pages/Course";

import ProtectedRoute from "../components/ProtectRoute";
import User from "../pages/User";

function AppRoute() {
  return (
    
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashStatus />} />
          <Route path="students" element={<Student />} />
          <Route path="department" element={<Department />} />
          <Route path="course" element={<Course />} />
          <Route path="users" element={<User />} />
        </Route>

      </Routes>
    
  );
}

export default AppRoute;