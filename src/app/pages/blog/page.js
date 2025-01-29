import Script from 'next/script'; // Import the Script component for loading external scripts
import NavBar from '../../components/Blog/NavBar'; // Import the NavBar component
import Categories from '../../components/Blog/Categories'; // Import the Categories component
import BlogItems from '../../components/Blog/BlogItems'; // Import the BlogItems component
import Footer from '../../components/Blog/Footer'; // Import the Footer component

export default function Blog() {
  return (
    <>
      <div className="container-fluid vh-100">
        <NavBar /> {/* Render the NavBar component */}
        <Categories /> {/* Render the Categories component */}
        <BlogItems /> {/* Render the BlogItems component */}
        <Footer /> {/* Render the Footer component */}
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script> {/* Load Bootstrap JavaScript */}
    </>
  );
}
