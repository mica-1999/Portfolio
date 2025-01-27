"use client"

export default function Header() {
  return (
    <div className="row d-flex align-items-center">
      <div className="col-lg-12 d-flex align-items-center">
        <i className="fa-solid fa-bars fa-lg me-2" id="expand-sidebar" style={{ display: 'none' }}></i>
        <a href="#" className="search-link d-flex align-items-center">
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
          <span className="ms-2 ps-3" style={{ color: '#7b7c95' }}>Search (Ctrl+/)</span>
        </a>
        <div className="d-flex gap-3 ms-auto align-items-center profile-section">
          <a href="https://www.youtube.com/"><i className="fa-brands fa-youtube fa-lg"></i></a>
          <a href="https://github.com/mica-1999"><i className="fa-brands fa-github fa-lg"></i></a>
          <i className="fa-solid fa-arrows-rotate fa-lg" onClick={() => window.location.reload()}></i>
          <i className="fa-regular fa-bell fa-lg"></i>
          <img src="../assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon" />
        </div>
      </div>
    </div>
  );
}
