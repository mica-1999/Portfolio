export const metadata = {
  title: 'Chat Dashboard',
  description: 'Chat with other users in the system.',
};

export default async function ChatLayout({ children }) {
  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/chat.css" />
    {children}
    </>
  );
}