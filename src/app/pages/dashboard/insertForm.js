import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js
import Head from 'next/head'; // Import the Head component for managing the document head
import Script from 'next/script'; // Import the Script component for loading external scripts
import Sidebar from '../../components/Dashboard/Sidebar'; // Import the Sidebar component
import Header from '../../components/Dashboard/Header'; // Import the Header component
import Forms from '../../components/Dashboard/Forms/newMenu'; // Import the Forms component
import Footer from '../../components/Dashboard/Footer'; // Import the Footer component

export default function Dashboard() {
  const router = useRouter();
  const currentPath = router.pathname; // Get the current route

  return (
    <>
      <Head>
        <title>Dashboard for Portfolio</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/styles.css" /> {/* Import dashboard-specific CSS */}
      </Head>
      <div className="container-fluid vh-100">
        <div className="row">
          <Sidebar currentPath={currentPath} /> {/* Render the Sidebar component */}
          <div className="col-lg-10 offset-lg-2 p-4 card-section">
            <Header /> {/* Render the Header component */}
            <div className="row d-flex mt-3">
              <Forms /> {/* Render the Forms component */}
              <Forms /> {/* Render the Forms component */}
            </div>
            <Footer /> {/* Render the Footer component */}
          </div>
        </div>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script> {/* Load Bootstrap JavaScript */}
      <Script src="/assets/js/sidebar.js"></Script> {/* Load the sidebar script */}
    </>
  );
}