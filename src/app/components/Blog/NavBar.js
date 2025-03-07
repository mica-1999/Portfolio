"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Used to get the current path
import { useState, useEffect } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Arrow function to remove event listener (anonymous function/only happens once)
  }, []);

  // Check if current path is active
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className={`blog-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/pages/blog">
            <span className="brand-name">Micael</span>
            <span className="brand-dev">Dev</span>
          </Link>
        </div>

        <div className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-items">
            <Link href="/pages/blog" className={`nav-link ${isActive('/pages/blog') ? 'active' : ''}`}>
              Projects
            </Link>
            <Link href="/pages/about" className={`nav-link ${isActive('/pages/about') ? 'active' : ''}`}>
              About
            </Link>
            <Link href="/pages/contact" className={`nav-link ${isActive('/pages/contact') ? 'active' : ''}`}>
              Contact
            </Link>
          </div>
          
          <Link href="/pages/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}