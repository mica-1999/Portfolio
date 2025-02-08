import NavBar from '/src/app/components/Blog/NavBar';
import Categories from '/src/app/components/Blog/Categories';
import BlogItems from '/src/app/components/Blog/BlogItems';
import Footer from '/src/app/components/Blog/Footer';

export default function Blog() {
  return (
    <>
      <div className="container-fluid vh-100">
        <NavBar />
        <Categories />
        <BlogItems />
        <Footer />
      </div>
    </>
  );
}