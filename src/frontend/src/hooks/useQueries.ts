import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ProjectType, Estimate } from '../backend';

export function useGetAllProjectTypes() {
  const { actor, isFetching } = useActor();

  return useQuery<ProjectType[]>({
    queryKey: ['projectTypes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjectTypes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllEstimates() {
  const { actor, isFetching } = useActor();

  return useQuery<Estimate[]>({
    queryKey: ['estimates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEstimates();
    },
    enabled: !!actor && !isFetching,
  });
}
