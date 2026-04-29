import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import HowItWorks from './components/HowItWorks';
import DualCTA from './components/DualCTA';
import AppDownload from './components/AppDownload';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import ProviderRegister from './components/ProviderRegister';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import Affiliate from './components/Affiliate';
import './styles/global.css';

function Home() {
  useEffect(() => {
    function onEntry(entry, i) {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => onEntry(e, i)),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <DualCTA />
      <AppDownload />
    </>
  );
}

function ScrollToTop(){
  const { pathname, search }=useLocation();
  useEffect(()=>{window.scrollTo(0,0);},[pathname,search]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="/cadastro/prestador" element={<ProviderRegister />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/afiliados" element={<Affiliate />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
