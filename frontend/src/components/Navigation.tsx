import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Technology', href: '#technology' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-neon-blue/20 shadow-glow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shadow-glow">
              <span className="text-lg sm:text-xl font-bold text-white">YT</span>
            </div>
            <span className="text-lg sm:text-xl font-bold gradient-text">Yadav Tech</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-neon-blue transition-colors duration-200 min-h-[44px] flex items-center"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-neon-blue to-electric-purple hover:shadow-glow-lg transition-all duration-300"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-lg glass-panel min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 glass-panel rounded-lg p-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground/80 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-200 min-h-[44px]"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-gradient-to-r from-neon-blue to-electric-purple hover:shadow-glow-lg transition-all duration-300 mt-2 min-h-[44px]"
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
