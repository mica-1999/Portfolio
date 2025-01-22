import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Sidebar({ currentPath }) {
  const [active_menu, update_active_menu] = useState(null);

  // Retrieve the active menu from localStorage when the component mounts
  useEffect(() => {
    const storedMenu = localStorage.getItem('active_menu');
    if (storedMenu) {
      update_active_menu(storedMenu || 'dashboard');
    }
  }, []);

  function handle_menu_click(menu_clicked) {
    update_active_menu(menu_clicked);
    localStorage.setItem('active_menu', menu_clicked);
  }

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
                  <Link href="/dashboard/" className={active_menu === 'dashboard' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('dashboard')}>
                    DashBoard
                  </Link>
                </li>
                <li>
                  <Link href="#" className={active_menu === 'blog' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('blog')}>
                    Blog Site
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/insertForm" className={active_menu === 'insertForm' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('insertForm')}>
                    Insert Menu
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative projects" data-bs-toggle="collapse" href="#projectsSubMenu" role="button" aria-expanded="false" aria-controls="projectsSubMenu">Projects</a>
              <ul id="projectsSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={active_menu === 'project1' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('project1')}>
                    Project 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className={active_menu === 'project2' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('project2')}>
                    Project 2
                  </Link>
                </li>
                <li>
                  <Link href="#" className={active_menu === 'project3' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('project3')}>
                    Project 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative learning" data-bs-toggle="collapse" href="#learningSubMenu" role="button" aria-expanded="false" aria-controls="learningSubMenu">Learning</a>
              <ul id="learningSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={active_menu === 'learning1' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('learning1')}>
                    Learning 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className={active_menu === 'learning2' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('learning2')}>
                    Learning 2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
            </li>
            <li>
              <Link href="#" className={active_menu === 'email' ? 'nav-link active email' : 'nav-link email'} onClick={() => handle_menu_click('email')}>
                Email
              </Link>
            </li>
            <li>
              <Link href="#" className={active_menu === 'chat' ? 'nav-link active chat' : 'nav-link chat'} onClick={() => handle_menu_click('chat')}>
                Chat
              </Link>
            </li>
            <li>
              <Link href="#" className={active_menu === 'calendar' ? 'nav-link active calendar' : 'nav-link calendar'} onClick={() => handle_menu_click('calendar')}>
                Calendar
              </Link>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative music" data-bs-toggle="collapse" href="#musicSubMenu" role="button" aria-expanded="false" aria-controls="musicSubMenu">Music</a>
              <ul id="musicSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={active_menu === 'playlists' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('playlists')}>
                    Playlists
                  </Link>
                </li>
                <li>
                  <Link href="#" className={active_menu === 'favorites' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('favorites')}>
                    Favorites Songs
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative useful-websites" data-bs-toggle="collapse" href="#usefulWebsitesSubMenu" role="button" aria-expanded="false" aria-controls="usefulWebsitesSubMenu">Websites</a>
              <ul id="usefulWebsitesSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="#" className={active_menu === 'website1' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('website1')}>
                    Website 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className={active_menu === 'website2' ? 'nav-link active' : 'nav-link'} onClick={() => handle_menu_click('website2')}>
                    Website 2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Configs</span>
            </li>
            <li>
              <Link href="#" className={active_menu === 'users' ? 'nav-link active users' : 'nav-link users'} onClick={() => handle_menu_click('users')}>
                Users
              </Link>
            </li>
            <li>
              <Link href="#" className={active_menu === 'posts' ? 'nav-link active posts' : 'nav-link posts'} onClick={() => handle_menu_click('posts')}>
                Posts
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={active_menu === 'dashboard' ? 'nav-link active dashboard' : 'nav-link dashboard'} onClick={() => handle_menu_click('dashboard')}>
                DashBoard
              </Link>
            </li>
            <li>
              <Link href="#" className={active_menu === 'roles' ? 'nav-link active roles' : 'nav-link roles'} onClick={() => handle_menu_click('roles')}>
                Roles & Permissions
              </Link>
            </li>
            <li>
              <Link href="#" className={active_menu === 'others' ? 'nav-link active others' : 'nav-link others'} onClick={() => handle_menu_click('others')}>
                Others
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
