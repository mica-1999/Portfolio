export const metadata = {
  title: 'Personal Profile',
  description: 'View and manage your personal profile information.',
};

export default async function PersonalLayout({ children }) {
  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/personal.css" />
    {children}
    </>
  );
}