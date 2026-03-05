import { useScrollAnimation } from '../hooks/useScrollAnimation';
import MockupCard from './MockupCard';

const ProductShowcase = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const mockups: Array<{
    image: string;
    title: string;
    type: 'desktop' | 'mobile';
  }> = [
    {
      image: '/assets/generated/mockup-trading-dashboard.dim_800x600.png',
      title: 'AI Trading Dashboard UI',
      type: 'desktop',
    },
    {
      image: '/assets/generated/mockup-chatbot.dim_800x600.png',
      title: 'AI Chatbot System',
      type: 'desktop',
    },
    {
      image: '/assets/generated/mockup-saas-panel.dim_800x600.png',
      title: 'SaaS Admin Panel',
      type: 'desktop',
    },
    {
      image: '/assets/generated/mockup-mobile-app.dim_400x800.png',
      title: 'Mobile App Preview',
      type: 'mobile',
    },
    {
      image: '/assets/generated/mockup-automation-flow.dim_800x600.png',
      title: 'AI Automation Flow',
      type: 'desktop',
    },
  ];

  return (
    <section
      id="showcase"
      ref={ref}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 gradient-text">
          Product Showcase
        </h2>
        <p className="text-center text-foreground/70 mb-10 sm:mb-12 md:mb-16 text-base sm:text-lg px-4">
          Real-world AI solutions we've built
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mockups.map((mockup, index) => (
            <MockupCard
              key={index}
              image={mockup.image}
              title={mockup.title}
              type={mockup.type}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
