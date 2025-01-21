import Link from 'next/link';

export default function Sidebar({ currentPath }) {
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
                  <Link href="/dashboard" className={currentPath === '/dashboard/index' ? 'nav-link active' : 'nav-link'}>
                    Main
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className={currentPath === '/blog' ? 'nav-link active' : 'nav-link'}>
                    Blog Site
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/insertForm" className={currentPath === '/dashboard/insertForm' ? 'nav-link active' : 'nav-link'}>
                    Insert
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative projects" data-bs-toggle="collapse" href="#projectsSubMenu" role="button" aria-expanded="false" aria-controls="projectsSubMenu">Projects</a>
              <ul id="projectsSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="/projects/project1" className={currentPath === '/projects/project1' ? 'nav-link active' : 'nav-link'}>
                    Project 1
                  </Link>
                </li>
                <li>
                  <Link href="/projects/project2" className={currentPath === '/projects/project2' ? 'nav-link active' : 'nav-link'}>
                    Project 2
                  </Link>
                </li>
                <li>
                  <Link href="/projects/project3" className={currentPath === '/projects/project3' ? 'nav-link active' : 'nav-link'}>
                    Project 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative learning" data-bs-toggle="collapse" href="#learningSubMenu" role="button" aria-expanded="false" aria-controls="learningSubMenu">Learning</a>
              <ul id="learningSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="/learning/learning1" className={currentPath === '/learning/learning1' ? 'nav-link active' : 'nav-link'}>
                    Learning 1
                  </Link>
                </li>
                <li>
                  <Link href="/learning/learning2" className={currentPath === '/learning/learning2' ? 'nav-link active' : 'nav-link'}>
                    Learning 2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
            </li>
            <li>
              <Link href="/email" className={currentPath === '/email' ? 'nav-link active' : 'nav-link'}>
                Email
              </Link>
            </li>
            <li>
              <Link href="/chat" className={currentPath === '/chat' ? 'nav-link active' : 'nav-link'}>
                Chat
              </Link>
            </li>
            <li>
              <Link href="/calendar" className={currentPath === '/calendar' ? 'nav-link active' : 'nav-link'}>
                Calendar
              </Link>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative music" data-bs-toggle="collapse" href="#musicSubMenu" role="button" aria-expanded="false" aria-controls="musicSubMenu">Music</a>
              <ul id="musicSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="/music/playlists" className={currentPath === '/music/playlists' ? 'nav-link active' : 'nav-link'}>
                    Playlists
                  </Link>
                </li>
                <li>
                  <Link href="/music/favorites" className={currentPath === '/music/favorites' ? 'nav-link active' : 'nav-link'}>
                    Favorites Songs
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a className="nav-link position-relative useful-websites" data-bs-toggle="collapse" href="#usefulWebsitesSubMenu" role="button" aria-expanded="false" aria-controls="usefulWebsitesSubMenu">Websites</a>
              <ul id="usefulWebsitesSubMenu" className="sub-menu nav collapse" data-bs-parent="#menuAccordion">
                <li>
                  <Link href="/websites/website1" className={currentPath === '/websites/website1' ? 'nav-link active' : 'nav-link'}>
                    Website 1
                  </Link>
                </li>
                <li>
                  <Link href="/websites/website2" className={currentPath === '/websites/website2' ? 'nav-link active' : 'nav-link'}>
                    Website 2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Configs</span>
            </li>
            <li>
              <Link href="/users" className={currentPath === '/users' ? 'nav-link active' : 'nav-link'}>
                Users
              </Link>
            </li>
            <li>
              <Link href="/posts" className={currentPath === '/posts' ? 'nav-link active' : 'nav-link'}>
                Posts
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={currentPath === '/dashboard' ? 'nav-link active' : 'nav-link'}>
                DashBoard
              </Link>
            </li>
            <li>
              <Link href="/roles" className={currentPath === '/roles' ? 'nav-link active' : 'nav-link'}>
                Roles & Permissions
              </Link>
            </li>
            <li>
              <Link href="/others" className={currentPath === '/others' ? 'nav-link active' : 'nav-link'}>
                Others
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
