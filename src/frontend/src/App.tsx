import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutFounder from './components/AboutFounder';
import ServicesSection from './components/ServicesSection';
import TechnologyStack from './components/TechnologyStack';
import ProductShowcase from './components/ProductShowcase';
import PricingSection from './components/PricingSection';
import ProjectCalculator from './components/ProjectCalculator';
import WhyYadavTech from './components/WhyYadavTech';
import GlobalVision from './components/GlobalVision';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleField from './components/ParticleField';
import Footer from './components/Footer';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Detect mobile device for performance optimizations
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen bg-space-black text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <ParticleField />
      
      <div className="relative z-10">
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutFounder />
          <ServicesSection />
          <TechnologyStack />
          <ProductShowcase />
          <PricingSection />
          <ProjectCalculator />
          <WhyYadavTech />
          <GlobalVision />
          <ContactSection />
        </main>

        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
}

export default App;
