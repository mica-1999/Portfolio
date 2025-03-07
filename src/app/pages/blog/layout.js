export const metadata = {
  title: 'Portfolio - Blog',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default function BlogLayout({ children }) {
  return (
    <>
      {/* Include the specific blog CSS */}
      <link rel="stylesheet" href="/assets/css/blog/blog.css" />
      {children}
    </>
  );
}