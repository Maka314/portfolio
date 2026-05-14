import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative flex flex-col justify-center items-center overflow-hidden mx-auto">
        <Hero />
        <About />
        <Projects />
        {/* <Skills /> */}
      </main>
      <Footer />
    </>
  );
}
