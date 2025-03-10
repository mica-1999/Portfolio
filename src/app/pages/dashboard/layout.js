import Sidebar from '/src/app/components/Dashboard/layout/Sidebar';
import Header from '/src/app/components/Dashboard/layout/Header'; 
import Footer from '/src/app/components/Dashboard/layout/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '/src/app/api/auth/[...nextauth]/route.js';
import { redirect } from 'next/navigation';
import DashboardClientWrapper from './wrapper.js';
import { SidebarProvider } from "/src/app/components/Dashboard/layout/sidebarManage.js";
import StylesProvider from '/src/app/components/StylesProvider';

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
      <StylesProvider stylesheets={[
        '/assets/css/styles.css',
        '/assets/css/dashboard/sidebar.css',
        '/assets/css/dashboard/header.css',
        '/assets/css/dashboard/footer.css',
        '/assets/css/dashboard/mainPage.css'
      ]} />
      
      <div className="container-fluid vh-100">
        <div className="row">
          <DashboardClientWrapper session={session}>
            <SidebarProvider>
              <Sidebar />
              <div className="col-lg-10 offset-lg-2 p-4 card-section">
                <Header /> 
                {children} 
                <Footer />
              </div>
            </SidebarProvider>
          </DashboardClientWrapper>
        </div>
      </div>
    </>
  );
}