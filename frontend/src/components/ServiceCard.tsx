import { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`floating-card glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-neon-blue/30 hover:border-neon-blue hover:shadow-glow-lg transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-neon-blue group-hover:text-electric-purple transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
