import { useState } from 'react';

interface ProjectFeatures {
  website: boolean;
  mobileApp: boolean;
  aiIntegration: boolean;
  ecommerce: boolean;
  automation: boolean;
}

export const useProjectEstimate = () => {
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateEstimate = async (features: ProjectFeatures) => {
    if (!features.website && !features.mobileApp) {
      setError('Please select at least one primary feature (Website or Mobile App)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Client-side calculation based on selected features
      let cost = 0;
      
      if (features.website) cost += 2000;
      if (features.mobileApp) cost += 3000;
      if (features.aiIntegration) cost += 1500;
      if (features.ecommerce) cost += 2500;
      if (features.automation) cost += 1800;

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEstimate(cost);
    } catch (err) {
      console.error('Error calculating estimate:', err);
      setError(err instanceof Error ? err.message : 'Failed to calculate estimate');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    estimate,
    isLoading,
    error,
    calculateEstimate,
  };
};
