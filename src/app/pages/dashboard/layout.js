import Sidebar from '../../components/Dashboard/Sidebar';
import Header from '../../components/Dashboard/Header'; 
import Footer from '../../components/Dashboard/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route.js';
import { redirect } from 'next/navigation';
import DashboardClientWrapper from './wrapper.js';

export const metadata = {
  title: 'Dashboard',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/pages/login'); // Redirect to login if not authenticated
  }

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
        <DashboardClientWrapper session={session}>
          <Sidebar/> {/* Render the Sidebar component */}
          <div className="col-lg-10 offset-lg-2 p-4 card-section">
            <Header /> {/* Render the Header component */}
              {children}
            <Footer /> {/* Render the Footer component */}
          </div>
          </DashboardClientWrapper>
        </div>
      </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/sidebar.js"></script>
      </body>
    </html>
  );
}