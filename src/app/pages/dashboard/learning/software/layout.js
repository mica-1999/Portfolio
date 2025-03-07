import { getServerSession } from 'next-auth';
import { authOptions } from '/src/app/api/auth/[...nextauth]/route.js';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learning Software',
  description: 'Learn software development topics and resources.',
};

export default async function LearningSoftwareLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/pages/login'); // Redirect to login if not authenticated
  }

  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/learnSoftware.css" />
    {children}
    </>
  );
}
