import { getServerSession } from 'next-auth';
import { authOptions } from '/src/app/api/auth/[...nextauth]/route.js';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Personal Profile',
  description: 'View and manage your personal profile information.',
};

export default async function PersonalLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/pages/login'); // Redirect to login if not authenticated
  }

  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/personal.css" />
    {children}
    </>
  );
}
