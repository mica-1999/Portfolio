"use client"; // Enable client-side rendering

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the new hook

export default function Sidebar() {
  const currentPath = usePathname(); // Use the usePathname hook to get the current path

  return (
    <div className="d-flex col-lg-2 p-3 flex-column ps-3 vh-100 position-fixed responsive-action" id="sidebar">
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between">
        <h4><img src="/assets/images/logo.png" alt="logo" width="20" height="20" /> Portfolio</h4>
        <i className="fa-solid fa-arrow-left fa-lg d-none"></i>
      </div>
      <div className="overflow-auto">
        <ul className="main-menu nav flex-column mt-3">
          <div id="menuAccordion">
            {/* Main Menu */}
            <li className="menu-item">
              <a className="nav-link position-relative dashboards" data-bs-toggle="collapse" href="#dashboardSubMenu" role="button" aria-expanded="true" aria-controls="dashboardSubMenu">Main</a>
              <ul id="dashboardSubMenu" className="sub-menu nav collapse show" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="/pages/dashboard/" className={currentPath === '/pages/dashboard' ? 'nav-link active' : 'nav-link'}>
                    DashBoard
                  </Link>
                </li>
                <li>
                  <Link href="/pages/dashboard/form/" className={currentPath === '/pages/dashboard/form' ? 'nav-link active' : 'nav-link'}>
                    Insert Menu
                  </Link>
                </li>
                <li>
                  <Link href="/pages/blog" className={currentPath === '/pages/blog' ? 'nav-link active' : 'nav-link'}>
                    Blog Site
                  </Link>
                </li>
              </ul>
            </li>
            {/* Projects Menu */}
            <li className="menu-item">
              <a className="nav-link position-relative projects" data-bs-toggle="collapse" href="#projectsSubMenu" role="button" aria-expanded="false" aria-controls="projectsSubMenu">Projects</a>
              <ul id="projectsSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="/dashboard/projects/" className={currentPath === '/dashboard/projects' ? 'nav-link active' : 'nav-link'}>
                    Project 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className={currentPath === '/project2' ? 'nav-link active' : 'nav-link'}>
                    Project 2
                  </Link>
                </li>
                <li>
                  <Link href="#" className={currentPath === '/project3' ? 'nav-link active' : 'nav-link'}>
                    Project 3
                  </Link>
                </li>
              </ul>
            </li>
            {/* Learning Menu */}
            <li className="menu-item">
              <a className="nav-link position-relative learning" data-bs-toggle="collapse" href="#learningSubMenu" role="button" aria-expanded="false" aria-controls="learningSubMenu">Learning</a>
              <ul id="learningSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={currentPath === '/learning1' ? 'nav-link active' : 'nav-link'}>
                    Learning 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className={currentPath === '/learning2' ? 'nav-link active' : 'nav-link'}>
                    Learning 2
                  </Link>
                </li>
              </ul>
            </li>
            {/* Apps & Pages Header */}
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
            </li>
            {/* Apps & Pages Links */}
            <li>
              <Link href="#" className={currentPath === '/email' ? 'nav-link active email' : 'nav-link email'}>
                Email
              </Link>
            </li>
            <li>
              <Link href="#" className={currentPath === '/chat' ? 'nav-link active chat' : 'nav-link chat'}>
                Chat
              </Link>
            </li>
            <li>
              <Link href="#" className={currentPath === '/calendar' ? 'nav-link active calendar' : 'nav-link calendar'}>
                Calendar
              </Link>
            </li>
            {/* Music Menu */}
            <li className="menu-item">
              <a className="nav-link position-relative music" data-bs-toggle="collapse" href="#musicSubMenu" role="button" aria-expanded="false" aria-controls="musicSubMenu">Music</a>
              <ul id="musicSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={currentPath === '/playlists' ? 'nav-link active' : 'nav-link'}>
                    Playlists
                  </Link>
                </li>
                <li>
                  <Link href="#" className={currentPath === '/favorites' ? 'nav-link active' : 'nav-link'}>
                    Favorites Songs
                  </Link>
                </li>
              </ul>
            </li>
            {/* Websites Menu */}
            <li className="menu-item">
              <a className="nav-link position-relative useful-websites" data-bs-toggle="collapse" href="#usefulWebsitesSubMenu" role="button" aria-expanded="false" aria-controls="usefulWebsitesSubMenu">Websites</a>
              <ul id="usefulWebsitesSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={currentPath === '/website1' ? 'nav-link active' : 'nav-link'}>
                    Website 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className={currentPath === '/website2' ? 'nav-link active' : 'nav-link'}>
                    Website 2
                  </Link>
                </li>
              </ul>
            </li>
            {/* Configs Header */}
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Configs</span>
            </li>
            {/* Configs Links */}
            <li>
              <Link href="#" className={currentPath === '/users' ? 'nav-link active users' : 'nav-link users'}>
                Users
              </Link>
            </li>
            <li>
              <Link href="#" className={currentPath === '/posts' ? 'nav-link active posts' : 'nav-link posts'}>
                Posts
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={currentPath === '/blabla' ? 'nav-link active dashboard' : 'nav-link dashboard'}>
                DashBoard
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
