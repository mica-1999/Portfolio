import NavBar from '/src/app/components/Blog/NavBar'; // Import the NavBar component
import Categories from '/src/app/components/Blog/Categories'; // Import the Categories component
import BlogItems from '/src/app/components/Blog/BlogItems'; // Import the BlogItems component
import Footer from '/src/app/components/Blog/Footer'; // Import the Footer component

export default function Blog() {
  return (
    <>
      <div className="container-fluid vh-100">
        <NavBar /> {/* Render the NavBar component */}
        <Categories /> {/* Render the Categories component */}
        <BlogItems /> {/* Render the BlogItems component */}
        <Footer /> {/* Render the Footer component */}
      </div>
    </>
  );
}
