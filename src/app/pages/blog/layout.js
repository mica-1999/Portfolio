import StylesProvider from '/src/app/components/StylesProvider';
import NavBar from '/src/app/components/Blog/NavBar';
import Footer from '/src/app/components/Blog/Footer';

export const metadata = {
  title: 'Portfolio - Blog',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default function BlogLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/blog/blog.css']} />
      <div className="container-fluid vh-100 p-0">
        <NavBar />
        <div className='mt-5'>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}