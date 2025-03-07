export const metadata = {
  title: 'Create Software Topic',
  description: 'Create new software development learning topics.',
};

export default function NewSoftwareLayout({ children }) {
  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/management.css" />
    {children}
    </>
  );
}
