import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AnimatedConnections from './AnimatedConnections';

const TechnologyStack = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const technologies = [
    'Machine Learning',
    'OpenAI API Integration',
    'ChatGPT Integration',
    'AI Recommendation Engine',
    'Real-Time Analytics Dashboard',
    'Cloud Deployment Architecture',
  ];

  return (
    <section
      id="technology"
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">
          AI Technology Stack
        </h2>
        <p className="text-center text-foreground/70 mb-16 text-lg">
          Powered by cutting-edge artificial intelligence
        </p>

        <div className="relative">
          <AnimatedConnections />
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-node glass-panel p-6 rounded-xl border border-electric-purple/30 hover:border-electric-purple hover:shadow-glow transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-neon-blue to-electric-purple animate-pulse shadow-glow-sm"></div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {tech}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
