import Script from 'next/script';
import '../utils/global.css';

export const metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my portfolio site!',
};

export default function GlobalLayout({ children }) {
  return (
    <html lang="en">
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