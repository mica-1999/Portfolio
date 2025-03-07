"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { menuData, menuPages, configMenuItems } from '../../data/menuData';
import { useSidebar } from "/src/app/components/Dashboard/sidebarManage.js";

export default function Sidebar() {
  const currentPath = usePathname();

  // Sidebar Menu State
  const [mainMenu, setMenu] = useState(menuData);
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  
  return (
    <div className={`d-flex col-lg-2 p-3 flex-column ps-3 vh-100 position-fixed sidebarMenu ${sidebarOpen ? 'open' : 'closed'}`}>
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between logo mt-3">
        <a href="/pages/dashboard"><img  src="/assets/images/portfolio.png" alt="logo" /></a>
        <i className="fa-solid fa-arrow-left fa-lg d-none" style={{ cursor:"pointer" }} onClick={() => setSidebarOpen(false)}></i>
      </div>
      <div className="overflow-auto mt-4">
        <ul className="main-menu nav flex-column mt-3">
          <div id="menuAccordion">

            {mainMenu.map((menu) => {
              return (
                menu.hasSubMenu ? (
                  <li key={menu.name} className="menu-item">
                    <a className={`nav-link position-relative ${menu.icon}`} data-bs-toggle="collapse" href={`#${menu.name}SubMenu`} role="button" aria-expanded={menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'true' : ''} aria-controls={`${menu.name}SubMenu`}>{menu.name}</a>
                    <ul id={`${menu.name}SubMenu`} className={`sub-menu nav collapse ${menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'show' : ''}`} data-bs-parent="#menuAccordion">
                      {menu.subMenu.map((subMenu) => { 
                        return (
                          <li key={subMenu.page}>
                            <Link  href={subMenu.page} className={`nav-link ${currentPath === subMenu.page ? 'active' : ''}`}>
                              {subMenu.name}
                            </Link>
                          </li>
                        ) 
                      })}
                    </ul>
                  </li>
                ) : (
                  <li key={menu.name}>
                    <Link  href={menu.page} className={`nav-link ${menu.icon} ${currentPath === menu.page ? 'active' : ''}`}>
                      {menu.name}
                    </Link>
                  </li>
                )
              );
            })}
            

            {/* Apps & Pages Header */}
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
            </li>
            {/* Apps & Pages Links */}
            {menuPages.map((menu) => {
              return (
                menu.hasSubMenu ? (
                  <li key={menu.name} className="menu-item">
                    <a className={`nav-link position-relative ${menu.icon}`} data-bs-toggle="collapse" href={`#${menu.name}SubMenu`} role="button" aria-expanded={menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'true' : ''} aria-controls={`${menu.name}SubMenu`}>{menu.name}</a>
                    <ul id={`${menu.name}SubMenu`} className={`sub-menu nav collapse ${menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'show' : ''}`} data-bs-parent="#menuAccordion">
                      {menu.subMenu.map((subMenu) => { 
                        return (
                          <li key={subMenu.page}>
                            <Link  href={subMenu.page} className={`nav-link ${currentPath === subMenu.page ? 'active' : ''}`}>
                              {subMenu.name}
                            </Link>
                          </li>
                        ) 
                      })}
                    </ul>
                  </li>
                ) : (
                  <li key={menu.name}>
                    <Link  href={menu.page} className={`nav-link ${menu.icon} ${currentPath === menu.page ? 'active' : ''}`}>
                      {menu.name}
                    </Link>
                  </li>
                )
              );
            })}




            {/* Configs Header */}
            <li className="menu-header mt-4 mb-2 position-relative">
              <span className="menu-header-text" data-i18n="Apps &amp; Pages">Configs</span>
            </li>
            {/* Configs Links */}
            {configMenuItems.map((menu) => {
              return (
                menu.hasSubMenu ? (
                  <li key={menu.name} className="menu-item">
                    <a className={`nav-link position-relative ${menu.icon}`} data-bs-toggle="collapse" href={`#${menu.name}SubMenu`} role="button" aria-expanded={menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'true' : ''} aria-controls={`${menu.name}SubMenu`}>{menu.name}</a>
                    <ul id={`${menu.name}SubMenu`} className={`sub-menu nav collapse ${menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'show' : ''}`} data-bs-parent="#menuAccordion">
                      {menu.subMenu.map((subMenu) => { 
                        return (
                          <li key={subMenu.page}>
                            <Link  href={subMenu.page} className={`nav-link ${currentPath === subMenu.page ? 'active' : ''}`}>
                              {subMenu.name}
                            </Link>
                          </li>
                        ) 
                      })}
                    </ul>
                  </li>
                ) : (
                  <li key={menu.name}>
                    <Link  href={menu.page} className={`nav-link ${menu.icon} ${currentPath === menu.page ? 'active' : ''}`}>
                      {menu.name}
                    </Link>
                  </li>
                )
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}