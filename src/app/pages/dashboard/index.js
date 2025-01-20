import Head from 'next/head';
import Script from 'next/script';
import Sidebar from '../../components/Dashboard/Sidebar';
import Header from '../../components/Dashboard/Header';
import MainContent from '../../components/Dashboard/MainContent';
import Footer from '../../components/Dashboard/Footer';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard for Portfolio</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/styles.css" /> {/* Import dashboard-specific CSS */}
      </Head>
      <div className="container-fluid vh-100">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 offset-lg-2 p-4 card-section">
            <Header />
            <MainContent />
            <Footer />
          </div>
        </div>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>
      <Script>
        {`
          document.querySelectorAll('.sub-menu a').forEach(item => {
            item.addEventListener('click', function() {
              document.querySelectorAll('.sub-menu a').forEach(link => {
                link.classList.remove('active');
              });
              this.classList.add('active');
            });
          });

          document.getElementById('expand-sidebar').addEventListener('click', function() {
            const expand = document.getElementById('sidebar');
            expand.classList.add("z-2");
            expand.classList.remove("responsive-action");
            document.getElementsByClassName("fa-arrow-left")[0].classList.remove("d-none");    
          });

          document.getElementsByClassName("fa-arrow-left")[0].addEventListener('click', function() {
            const expand = document.getElementById('sidebar');
            expand.classList.remove("z-2");
            expand.classList.add("responsive-action");
            document.getElementsByClassName("fa-arrow-left")[0].classList.add("d-none");
          });
        `}
      </Script>
    </>
  );
}