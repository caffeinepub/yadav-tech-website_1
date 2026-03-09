import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Message } from "../backend";
import { useActor } from "./useActor";

export function useGetConversation() {
  const { actor, isFetching } = useActor();

  return useQuery<Message[]>({
    queryKey: ["conversation"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversation();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: false,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.sendUserMessage(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
  });
}
