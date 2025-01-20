import Head from 'next/head';
import Script from 'next/script';
import NavBar from '../../components/Blog/NavBar';
import Categories from '../../components/Blog/Categories';
import BlogItems from '../../components/Blog/BlogItems';
import Footer from '../../components/Blog/Footer';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/blog.css" /> {/* Import blog-specific CSS */}
      </Head>
      <div className="container-fluid vh-100">
        <NavBar />
        <Categories />
        <BlogItems />
        <Footer />
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>
    </>
  );
}
