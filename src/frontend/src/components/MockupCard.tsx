import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface MockupCardProps {
  image: string;
  title: string;
  type: 'desktop' | 'mobile';
  delay?: number;
}

const MockupCard = ({ image, title, type, delay = 0 }: MockupCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`floating-card glass-panel p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-neon-blue/30 hover:border-electric-purple hover:shadow-glow-lg transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${type === 'mobile' ? 'sm:col-span-1' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-space-black/50 min-h-[200px] sm:min-h-[250px]">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 text-center text-neon-blue group-hover:text-electric-purple transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
};

export default MockupCard;
