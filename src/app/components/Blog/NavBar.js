import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="row">
      <div className="col-lg-12 d-flex justify-content-center align-items-center mt-5">
        <div className="d-flex justify-content-evenly align-items-center rounded-pill nav-links" style={{ backgroundColor: '#939393', width: '400px', height: '45px' }}>
          <div className="rounded-pill active"><Link href="/blog">Main</Link></div>
          <div className="rounded-pill"><Link href="/python">Python</Link></div>
          <div className="rounded-pill"><Link href="/web">Web</Link></div>
          <div className="rounded-pill"><Link href="/java">Java</Link></div>
          <div className="rounded-pill"><Link href="/dashboard">Dashboard</Link></div>
          <div className="rounded-pill"><Link href="/login">Login</Link></div>
        </div>
      </div>
    </div>
  );
}
