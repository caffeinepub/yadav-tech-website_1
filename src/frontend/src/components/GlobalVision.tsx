import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Globe2, TrendingUp, Zap } from 'lucide-react';

const GlobalVision = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="glass-panel p-12 rounded-3xl border border-electric-purple/30 shadow-glow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-electric-purple/5"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <Globe2 className="w-12 h-12 text-neon-blue animate-pulse" />
              <TrendingUp className="w-12 h-12 text-electric-purple animate-pulse" />
              <Zap className="w-12 h-12 text-neon-blue animate-pulse" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold gradient-text">
              Building India's Next AI Tech Brand
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Yadav Tech aims to become a global AI solutions provider delivering intelligent platforms worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-panel p-6 rounded-xl border border-neon-blue/30">
                <h3 className="text-3xl font-bold text-neon-blue mb-2">100+</h3>
                <p className="text-foreground/70">Projects Delivered</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border border-electric-purple/30">
                <h3 className="text-3xl font-bold text-electric-purple mb-2">50+</h3>
                <p className="text-foreground/70">Happy Clients</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border border-neon-blue/30">
                <h3 className="text-3xl font-bold text-neon-blue mb-2">24/7</h3>
                <p className="text-foreground/70">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalVision;
