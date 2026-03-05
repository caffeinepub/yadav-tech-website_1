import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Check } from 'lucide-react';

const WhyYadavTech = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const benefits = [
    'AI-First Architecture',
    'Scalable Cloud Systems',
    'Startup-Level Innovation',
    'Enterprise-Grade Security',
    '1 Year Free Technical Support',
    'Deployment + Maintenance',
  ];

  return (
    <section
      ref={ref}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 gradient-text">
          Why Yadav Tech?
        </h2>
        <p className="text-center text-foreground/70 mb-10 sm:mb-12 md:mb-16 text-base sm:text-lg px-4">
          The advantages that set us apart
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-neon-blue/30 hover:border-neon-blue hover:shadow-glow transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shrink-0 shadow-glow">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground pt-2">
                  {benefit}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyYadavTech;
