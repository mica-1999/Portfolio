import Script from 'next/script';
import '../styles/global.css';

export const metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my portfolio site!',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'My Portfolio',
    description: 'Explore my projects and accomplishments!',
    url: 'http://localhost:3000',
    image: '/images/img-1.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'Explore my projects and accomplishments!',
    image: '/images/img-1.png', 
  },
};

export default function GlobalLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}