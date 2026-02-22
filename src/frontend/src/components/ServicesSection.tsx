import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ServiceCard from './ServiceCard';
import { Brain, Smartphone, Apple, Cloud, Cog, ShoppingCart } from 'lucide-react';

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const services = [
    {
      icon: Brain,
      title: 'AI Website Development',
      description: 'Smart chatbots, recommendation engines, automation systems',
    },
    {
      icon: Smartphone,
      title: 'Android App Development',
      description: 'High-performance scalable mobile apps',
    },
    {
      icon: Apple,
      title: 'iOS App Development',
      description: 'Premium Apple-grade applications',
    },
    {
      icon: Cloud,
      title: 'AI SaaS Platforms',
      description: 'Subscription-based intelligent platforms',
    },
    {
      icon: Cog,
      title: 'Business Automation Systems',
      description: 'AI dashboards + analytics',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce with AI',
      description: 'Smart product suggestions + automation',
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">
          Our Services
        </h2>
        <p className="text-center text-foreground/70 mb-16 text-lg">
          Cutting-edge solutions powered by artificial intelligence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
