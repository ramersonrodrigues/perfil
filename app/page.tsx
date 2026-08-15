import Header from './components/Header';
import BackgroundAnimation from './components/BackgroundAnimation';
import Hero from './components/Hero';
import Academic from './components/Academic';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <div className="min-h-screen w-full relative z-10">
        <Header />
        <main className="max-w-[1200px] mx-auto px-4 md:px-6 relative">
          <Hero />
          <Stats />
          <Academic />
          <Experience />
          <Technologies />
          <Projects />
          <Testimonials />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
