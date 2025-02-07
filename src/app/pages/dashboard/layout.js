import Sidebar from '/src/app/components/Dashboard/Sidebar';
import Header from '/src/app/components/Dashboard/Header'; 
import Footer from '/src/app/components/Dashboard/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '/src/app/api/auth/[...nextauth]/route.js';
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
    <>
    <link rel="stylesheet" href="/assets/css/styles.css" />
    
      <div className="container-fluid vh-100">
        <div className="row">
          <DashboardClientWrapper session={session}>
            <Sidebar />
            <div className="col-lg-10 offset-lg-2 p-4 card-section">
              <Header /> 
              {children} 
              <Footer />
            </div>
          </DashboardClientWrapper>
        </div>
      </div>
      <script src="/assets/js/sidebar.js"></script>
    </>
  );
}