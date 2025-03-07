import NavBar from '/src/app/components/Blog/NavBar';
import BlogItems from '/src/app/components/Blog/BlogItems';
import Footer from '/src/app/components/Blog/Footer';

export default function Blog() {
  return (
    <>
      <div className="container-fluid vh-100">
        <NavBar />
        <BlogItems />
        <Footer />
      </div>
    </>
  );
}