import { getServerSession } from 'next-auth';
import { authOptions } from '/src/app/api/auth/[...nextauth]/route.js';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Chat Dashboard',
  description: 'Chat with other users in the system.',
};

export default async function ChatLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/pages/login'); // Redirect to login if not authenticated
  }

  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/chat.css" />
    {children}
    </>
  );
}