export const metadata = {
  title: 'Management Dashboard',
  description: 'Manage users, projects, and other resources in the system.',
};

export default async function ManagementLayout({ children }) {
  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/management.css" />
    {children}
    </>
  );
}
