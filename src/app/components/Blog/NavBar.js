"use client"  

import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="row">
      <div className="col-lg-12 d-flex justify-content-center align-items-center mt-5">
        <div className="d-flex justify-content-evenly align-items-center rounded-pill nav-links" style={{ backgroundColor: '#939393', width: '400px', height: '45px' }}>
          <div className="rounded-pill active"><Link href="/pages/blog">Main</Link></div>
          <div className="rounded-pill"><Link href="/pages/dashboard">Dashboard</Link></div>
          <div className="rounded-pill"><Link href="/pages/login">Login</Link></div>
        </div>
      </div>
    </div>
  );
}
