import StylesProvider from '/src/app/components/StylesProvider';

export const metadata = {
  title: 'Learning Software',
  description: 'Learn software development topics and resources.',
};

export default async function LearningSoftwareLayout({ children }) {
  return (
    <>
      <StylesProvider stylesheets={['/assets/css/dashboard/learnSoftware.css']} />
      {children}
    </>
  );
}
