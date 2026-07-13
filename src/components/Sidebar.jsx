import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  ClipboardList,
  KeyRound,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">SMS</h1>
        <p className="text-sm text-gray-400 mt-1">
          Student Management System
        </p>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/users" className={linkClass}>
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/dashboard/students" className={linkClass}>
          <GraduationCap size={20} />
          <span>Students</span>
        </NavLink>

        <NavLink to="/dashboard/department" className={linkClass}>
          <Building2 size={20} />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/dashboard/course" className={linkClass}>
          <BookOpen size={20} />
          <span>Courses</span>
        </NavLink>

        <NavLink to="/dashboard/enrollments" className={linkClass}>
          <ClipboardList size={20} />
          <span>Enrollments</span>
        </NavLink>

        <NavLink to="/dashboard/change-password" className={linkClass}>
          <KeyRound size={20} />
          <span>Change Password</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;