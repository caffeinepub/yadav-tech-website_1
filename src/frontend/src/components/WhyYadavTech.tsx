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
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">
          Why Yadav Tech?
        </h2>
        <p className="text-center text-foreground/70 mb-16 text-lg">
          The advantages that set us apart
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-2xl border border-neon-blue/30 hover:border-neon-blue hover:shadow-glow transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center flex-shrink-0 shadow-glow">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground pt-2">
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
