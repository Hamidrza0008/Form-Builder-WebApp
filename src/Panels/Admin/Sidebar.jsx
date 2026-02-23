import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `w-full text-left px-4 py-2.5 rounded-lg font-medium transition
     ${isActive
      ? "bg-[#5CBDB9] text-white shadow-sm"
      : "text-[#1F2933] hover:bg-[#EBF6F5]"
    }`;

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#EBF6F5] px-5 py-6">

      <div className="flex flex-col gap-2">
        <NavLink to="/adminpanel" end className={linkClass}>
          Admin Dashboard
        </NavLink>

        <NavLink to="/adminpanel/formbuilder" className={linkClass}>
          Form Builder
        </NavLink>

        <NavLink to="/adminpanel/responses" className={linkClass}>
          Responses
        </NavLink>
        <NavLink to="/adminpanel/forms" className={linkClass}>
          Created Forms
        </NavLink>
      </div>
    </aside>
  );
}
