import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route.js';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default async function LoginLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/pages/dashboard'); // Redirect if already logged in
  }

  return (
    <>
      {/* Include the specific login CSS */}
      <link rel="stylesheet" href="/assets/css/login.css" />
      
      {/* Layout Content */}
      <div className="container-fluid vh-100">
        <div className="row vh-100">
          <div className="d-flex col-lg-12 w-100 justify-content-center align-items-center">
            {children} {/* Render the specific login content */}
          </div>
        </div>
      </div>
    </>
  );
}
