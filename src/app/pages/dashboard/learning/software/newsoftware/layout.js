import StylesProvider from '/src/app/components/StylesProvider';

export const metadata = {
  title: 'Create Software Topic',
  description: 'Create new software development learning topics.',
};

export default function NewSoftwareLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/dashboard/management.css']} />
      {children}
    </>
  );
}
