import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import AISphereTHREE from './AISphereTHREE';
import BrandMessage from './BrandMessage';

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/', '_blank');
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <BrandMessage />
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">AI-Powered</span>
              <br />
              Websites & Apps
              <br />
              <span className="text-neon-blue">Built for the Future</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
              From intelligent automation to scalable digital platforms, Yadav Tech builds next-generation solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-neon-blue to-electric-purple hover:shadow-glow-lg transition-all duration-300 group"
              >
                Start Your AI Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="border-neon-blue/50 hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Consultation
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsApp}
                className="border-electric-purple/50 hover:bg-electric-purple/10 hover:border-electric-purple transition-all duration-300"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            <AISphereTHREE />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
