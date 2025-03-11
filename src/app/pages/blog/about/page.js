import AboutMe from '../../../components/Blog/AboutMe';

export const metadata = {
  title: 'About Me | Micael Ribeiro - Web Developer',
  description: 'Learn more about Micael Ribeiro, a full stack web developer specializing in React, Next.js, and modern web technologies.',
};

export default function About() {
  return (
    <main className="blog-main">
      <AboutMe />
    </main>
  );
}
