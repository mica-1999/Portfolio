import Sidebar from '../components/Dashboard/Sidebar'; // Import the Sidebar component
import Header from '../components/Dashboard/Header'; // Import the Header component
import Footer from '../components/Dashboard/Footer'; // Import the Footer component

export const metadata = {
  title: 'Dashboard for Portfolio',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta and Title */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
      <body>
      <div className="container-fluid vh-100">
        <div className="row">
          <Sidebar/> {/* Render the Sidebar component */}
          <div className="col-lg-10 offset-lg-2 p-4 card-section">
            <Header /> {/* Render the Header component */}   
              {children}
            <Footer /> {/* Render the Footer component */}
          </div>
        </div>
      </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/sidebar.js"></script>
      </body>
    </html>
  );
}
