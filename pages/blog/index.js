import NavBar from '../../components/NavBar';
import Categories from '../../components/Categories';
import BlogItems from '../../components/BlogItems';
import Footer from '../../components/Footer';
import SocialIcons from '../../components/SocialIcons';

export default function Home() {
  return (
    <div className="container-fluid vh-100">
      <NavBar />
      <Categories />
      <BlogItems />
      <Footer />
      <SocialIcons />
    </div>
  );
}
