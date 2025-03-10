"use client";

import Link from 'next/link';
import { socialLinks } from '../../data/socialData';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="blog-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row footer-content">
            <div className="col-lg-5 footer-about">
              <h3>About Me</h3>
              <p>Hello! My name is Micael Ribeiro and I'm a web developer passionate about creating innovative and efficient solutions. With experience in various technologies, I'm always looking for new challenges to improve my skills.</p>
              <div className="footer-social">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={link.name}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="col-lg-4 footer-contact">
              <h3>Contact Info</h3>
              <ul className="contact-list">
                <li>
                  <i className="ri-map-pin-line"></i>
                  <div>
                    <p>Caminho do Lombo da Piedade nº123</p>
                    <p>Canhas, Funchal, Madeira</p>
                  </div>
                </li>
                <li>
                  <i className="ri-phone-line"></i>
                  <a href="tel:+351964420812">+351 964 420 812</a>
                </li>
                <li>
                  <i className="ri-mail-line"></i>
                  <a href="mailto:micael1999work@gmail.com">micael1999work@gmail.com</a>
                </li>
                <li>
                  <i className="ri-file-list-line"></i>
                  <p><strong>Tax ID:</strong> 261446509</p>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-3 footer-links">
              <h3>Quick Links</h3>
              <div className="row">
                <div className="col-6">
                  <ul className="quick-links">
                    <li><Link href="/pages/blog">Home</Link></li>
                    <li><Link href="/pages/blog/projects">Projects</Link></li>
                    <li><Link href="/pages/blog/about">About Me</Link></li>
                    <li><Link href="/pages/blog/contact">Contact</Link></li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="quick-links">
                    <li><Link href="/pages/login">Login</Link></li>
                    <li><a href="#">PT Site</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} Micael Ribeiro · Web Design & Development · Madeira - Portugal</p>
        </div>
      </div>
    </footer>
  );
}