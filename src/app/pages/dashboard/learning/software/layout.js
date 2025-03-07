export const metadata = {
  title: 'Learning Software',
  description: 'Learn software development topics and resources.',
};

export default async function LearningSoftwareLayout({ children }) {
  return (
    <>
    <link rel="stylesheet" href="/assets/css/dashboard/learnSoftware.css" />
    {children}
    </>
  );
}
