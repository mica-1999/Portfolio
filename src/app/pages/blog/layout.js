import StylesProvider from '/src/app/components/StylesProvider';

export const metadata = {
  title: 'Portfolio - Blog',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default function BlogLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/blog/blog.css']} />
      {children}
    </>
  );
}