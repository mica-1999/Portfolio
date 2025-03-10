import StylesProvider from '/src/app/components/StylesProvider';

export const metadata = {
  title: 'Personal Profile',
  description: 'View and manage your personal profile information.',
};

export default async function PersonalLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/dashboard/personal.css']} />
      {children}
    </>
  );
}