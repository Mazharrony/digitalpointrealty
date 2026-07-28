import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import Marquee from "@/components/Marquee";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--text)]"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main">
        <span id="top" />
        <Hero />
        <About />
        <Services />
        <Process />
        <Trust />
        <Marquee />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
