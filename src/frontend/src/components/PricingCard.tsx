import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  popular: boolean;
  delay?: number;
}

const PricingCard = ({ name, price, features, popular, delay = 0 }: PricingCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className={`floating-card glass-panel p-6 rounded-2xl border transition-all duration-500 relative ${
        popular
          ? 'border-electric-purple shadow-glow-lg scale-105'
          : 'border-neon-blue/30 hover:border-neon-blue hover:shadow-glow'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-neon-blue to-electric-purple px-4 py-1 rounded-full text-sm font-bold text-white shadow-glow animate-pulse">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2 text-neon-blue">{name}</h3>
        <div className="flex items-baseline justify-center">
          <span className="text-sm text-foreground/70">₹</span>
          <span className="text-4xl font-bold gradient-text">{price}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={scrollToContact}
        className={`w-full ${
          popular
            ? 'bg-gradient-to-r from-neon-blue to-electric-purple hover:shadow-glow-lg'
            : 'bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50'
        } transition-all duration-300`}
      >
        Get Started
      </Button>
    </div>
  );
};

export default PricingCard;
