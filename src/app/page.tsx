import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden">
        <Hero />
        <About />
        <Projects />
        {/* <Skills /> */}
      </main>
      <Footer />
    </>
  );
}
