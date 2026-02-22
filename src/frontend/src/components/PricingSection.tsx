import { useScrollAnimation } from '../hooks/useScrollAnimation';
import PricingCard from './PricingCard';

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const pricingTiers = [
    {
      name: 'Starter Website',
      price: '9,999',
      features: [
        'Responsive Design',
        'Basic SEO',
        '5 Pages',
        '1 Month Support',
        'Mobile Optimized',
      ],
      popular: false,
    },
    {
      name: 'Business Pro',
      price: '24,999',
      features: [
        'Everything in Starter',
        'Advanced SEO',
        '10 Pages',
        'CMS Integration',
        '3 Months Support',
        'Analytics Dashboard',
      ],
      popular: true,
    },
    {
      name: 'AI Powered Website',
      price: '39,999',
      features: [
        'Everything in Business Pro',
        'AI Chatbot',
        'Recommendation Engine',
        'Unlimited Pages',
        '6 Months Support',
        'Custom AI Features',
      ],
      popular: false,
    },
    {
      name: 'Mobile App + AI',
      price: '79,999+',
      features: [
        'Native iOS & Android',
        'AI Integration',
        'Cloud Backend',
        'Push Notifications',
        '1 Year Support',
        'Continuous Updates',
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">
          Pricing Plans
        </h2>
        <p className="text-center text-foreground/70 mb-16 text-lg">
          Choose the perfect plan for your business
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
              name={tier.name}
              price={tier.price}
              features={tier.features}
              popular={tier.popular}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
