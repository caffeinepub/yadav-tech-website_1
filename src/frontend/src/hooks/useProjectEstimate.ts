import { useState } from 'react';
import { useActor } from './useActor';
import type { ProjectType } from '../backend';

export const useProjectEstimate = () => {
  const { actor } = useActor();
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateEstimate = async (features: ProjectType) => {
    if (!actor) {
      setError('Backend connection not available');
      return;
    }

    if (!features.website && !features.mobileApp) {
      setError('Please select at least one primary feature (Website or Mobile App)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cost = await actor.estimateProject(features);
      setEstimate(Number(cost));
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
