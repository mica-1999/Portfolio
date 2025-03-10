import StylesProvider from '/src/app/components/StylesProvider';

export const metadata = {
  title: 'Management Dashboard',
  description: 'Manage users, projects, and other resources in the system.',
};

export default async function ManagementLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/dashboard/management.css']} />
      {children}
    </>
  );
}