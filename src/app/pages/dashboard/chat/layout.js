import StylesProvider from '/src/app/components/StylesProvider';

export const metadata = {
  title: 'Chat Dashboard',
  description: 'Chat with other users in the system.',
};

export default async function ChatLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/dashboard/chat.css']} />
      {children}
    </>
  );
}