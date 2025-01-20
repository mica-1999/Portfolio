import { useState } from 'react';

export default function Sidebar() {
  const [link] = useState('/blog'); // Use a default link

  return (
    <div className="d-flex col-lg-2 p-3 flex-column ps-3 vh-100 position-fixed responsive-action" id="sidebar">
      <div className="d-flex align-items-center justify-content-between">
        <h4><img src="../assets/images/logo.png" alt="logo" width="20" height="20" /> Portfolio</h4>
        <i className="fa-solid fa-arrow-left fa-lg d-none"></i>
      </div>
      <div className="overflow-auto">
        <ul className="main-menu nav flex-column mt-3">
          <div id="menuAccordion">
            <li className="menu-item">
              <a className="nav-link position-relative dashboards" data-bs-toggle="collapse" href="#dashboardSubMenu" role="button" aria-expanded="true" aria-controls="dashboardSubMenu">Main</a>
              <ul id="dashboardSubMenu" className="sub-menu nav collapse show" data-bs-parent="#menuAccordion">
                <li>
                  <a className="nav-link active" href="#">Main</a>
                </li>
                <li>
                  <a className="nav-link" href={link}>Blog Site</a>
                </li>
              </ul>
            </li>
            
            <li className="menu-item">
              <a className="nav-link position-relative projects" data-bs-toggle="collapse" href="#projectsSubMenu" role="button" aria-expanded="false" aria-controls="projectsSubMenu">Projects</a>
              <ul id="projectsSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <a className="nav-link" href="#">Project 1</a>
                </li>
                <li>
                  <a className="nav-link" href="#">Project 2</a>
                </li>
                <li>
                  <a className="nav-link" href="#">Project 3</a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative learning" data-bs-toggle="collapse" href="#learningSubMenu" role="button" aria-expanded="false" aria-controls="learningSubMenu">Learning</a>
              <ul id="learningSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <a className="nav-link" href="#">Learning 1</a>
                </li>
                <li>
                  <a className="nav-link" href="#">Learning 2</a>
                </li>
              </ul>
            </li>
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
            </li>
            <li>
              <a className="nav-link position-relative email" href="#">Email</a>
            </li>
            <li>
              <a className="nav-link position-relative chat" href="#">Chat</a>
            </li>
            <li>
              <a className="nav-link position-relative calendar" href="#">Calendar</a>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative music" data-bs-toggle="collapse" href="#musicSubMenu" role="button" aria-expanded="false" aria-controls="musicSubMenu">Music</a>
              <ul id="musicSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <a className="nav-link" href="#">Playlists</a>
                </li>
                <li>
                  <a className="nav-link" href="#">Favorites Songs</a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative useful-websites" data-bs-toggle="collapse" href="#usefulWebsitesSubMenu" role="button" aria-expanded="false" aria-controls="usefulWebsitesSubMenu">Websites</a>
              <ul id="usefulWebsitesSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <a className="nav-link" href="#">Website 1</a>
                </li>
                <li>
                  <a className="nav-link" href="#">Website 2</a>
                </li>
              </ul>
            </li>
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Configs</span>
            </li>
            <li>
              <a className="nav-link position-relative users" href="#">Users</a>
            </li>
            <li>
              <a className="nav-link position-relative posts" href="#">Posts</a>
            </li>
            <li>
              <a className="nav-link position-relative dashboard" href="#">DashBoard</a>
            </li>
            <li>
              <a className="nav-link position-relative posts" href="#">Roles & Permissions</a>
            </li>
            <li>
              <a className="nav-link position-relative dashboard" href="#">Others</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
