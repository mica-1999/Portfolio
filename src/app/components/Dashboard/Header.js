"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react"; 
import { useSession } from "next-auth/react";
import { useSidebar } from "/src/app/components/Dashboard/sidebarManage.js";


export default function Header() {
  const { data: session, status } = useSession();
  const first_name = session?.user?.first_name || "Guest";
  const last_name = session?.user?.last_name || "";
  const role = session?.user?.role || "User";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handle_logout = async () => {
    try {
      await signOut({ callbackUrl: "/pages/blog" });
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  }

  return (
    <div className="row d-flex align-items-center">
      <div className="col-lg-12 d-flex align-items-center">
        <i className="fa-solid fa-bars fasideBar fa-lg ms-3 me-2 d-none" style={{ cursor:"pointer" }} onClick={() => setSidebarOpen(true)}></i>
        <a href="#" className="search-link d-flex align-items-center">
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
          <span className="ms-2 ps-3" style={{ color: '#7b7c95' }}>Search (Ctrl+/)</span>
        </a>
        <div className="d-flex gap-3 ms-auto align-items-center profile-section">
          <a href="https://www.youtube.com/"><i className="fa-brands fa-youtube fa-lg"></i></a>
          <a href="https://github.com/mica-1999"><i className="fa-brands fa-github fa-lg"></i></a>
          <i className="fa-solid fa-arrows-rotate fa-lg" onClick={() => window.location.reload()}></i>
          <i className="fa-regular fa-bell fa-lg"></i>
          <div className="dropdown">
            <img
              src="/assets/images/profile-icon.png"
              alt="Profile Icon"
              className="profile-icon dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
            />
            <ul className={`dropdown-menu mt-2 ${dropdownOpen ? "show" : ""}`} style={{ right: 0, left: "auto" }}>
              <li className="dropdown-header d-flex align-items-center">
                <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                <div className="ms-2">
                  <p className="mb-0" style={{ color: "#d7d8ed" }}>{first_name + " " + last_name}</p>
                  <small className="text-muted">{role}</small>
                </div>
              </li>
              <hr className="dropdown-divider" />
              <li><a className="dropdown-item" href="/pages/dashboard/personal"><i className="fa-solid fa-user me-2"></i>My Profile</a></li>
              <li><a className="dropdown-item" href="#"><i className="fa-solid fa-cog me-2"></i>Settings</a></li>
              <hr className="dropdown-divider" />
              <li><a className="dropdown-item" href="#"><i className="fa-solid fa-question-circle me-2"></i>FAQ</a></li>
              <li><button className="dropdown-item logout-btn" onClick={handle_logout}><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}