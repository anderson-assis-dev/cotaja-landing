import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import AppScreens from './components/AppScreens';
import AISection from './components/AISection';
import EmailSection from './components/EmailSection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BgCanvas from './components/BgCanvas';

function App() {
  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BgCanvas />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <AppScreens />
        <AISection />
        <EmailSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
