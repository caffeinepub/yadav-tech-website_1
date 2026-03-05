import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Loader2 } from 'lucide-react';
import { useProjectEstimate } from '../hooks/useProjectEstimate';

const ProjectCalculator = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [features, setFeatures] = useState({
    website: false,
    mobileApp: false,
    aiIntegration: false,
    ecommerce: false,
    automation: false,
  });

  const { estimate, isLoading, error, calculateEstimate } = useProjectEstimate();

  const handleFeatureChange = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleCalculate = () => {
    calculateEstimate(features);
  };

  const featureOptions = [
    { key: 'website' as const, label: 'Website Development', cost: '₹2,000' },
    { key: 'mobileApp' as const, label: 'Mobile App (iOS/Android)', cost: '₹3,000' },
    { key: 'aiIntegration' as const, label: 'AI Integration', cost: '₹3,500' },
    { key: 'ecommerce' as const, label: 'E-Commerce Features', cost: '₹9,000' },
    { key: 'automation' as const, label: 'Business Automation', cost: '₹4,000' },
  ];

  return (
    <section
      ref={ref}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 gradient-text">
          AI Project Calculator
        </h2>
        <p className="text-center text-foreground/70 mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg px-4">
          Get an instant estimate for your project
        </p>

        <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-neon-blue/30 shadow-glow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {featureOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-start space-x-3 p-4 sm:p-5 rounded-lg sm:rounded-xl glass-panel border border-electric-purple/20 hover:border-electric-purple/50 transition-all duration-300 min-h-[60px]"
              >
                <div className="flex items-center justify-center min-w-[44px] min-h-[44px]">
                  <Checkbox
                    id={option.key}
                    checked={features[option.key]}
                    onCheckedChange={() => handleFeatureChange(option.key)}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="flex-1 pt-2">
                  <Label
                    htmlFor={option.key}
                    className="text-sm sm:text-base font-medium cursor-pointer text-foreground leading-tight"
                  >
                    {option.label}
                  </Label>
                  <p className="text-xs sm:text-sm text-neon-blue mt-1">{option.cost}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleCalculate}
            disabled={isLoading || (!features.website && !features.mobileApp)}
            className="w-full bg-gradient-to-r from-neon-blue to-electric-purple hover:shadow-glow-lg transition-all duration-300 text-base sm:text-lg py-5 sm:py-6 min-h-[52px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 w-5 h-5" />
                Calculate Estimate
              </>
            )}
          </Button>

          {error && (
            <div className="mt-5 sm:mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/50">
              <p className="text-destructive text-center text-sm sm:text-base">{error}</p>
            </div>
          )}

          {estimate !== null && !error && (
            <div className="mt-6 sm:mt-8 text-center">
              <div className="glass-panel p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-neon-blue shadow-glow-lg">
                <p className="text-base sm:text-lg text-foreground/70 mb-2">Estimated Project Cost</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-xl sm:text-2xl text-neon-blue">₹</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text">
                    {estimate.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/60 mt-3 sm:mt-4">
                  * Final pricing may vary based on specific requirements
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectCalculator;
