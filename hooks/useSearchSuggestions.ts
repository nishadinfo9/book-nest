import { useQuery } from "@tanstack/react-query";
import { getBookSuggestion } from "@/http/api";

export function useSearchSuggestions(search: string) {
  return useQuery({
    queryKey: ["search-suggestions", search],
    queryFn: () => getBookSuggestion({search}),
    enabled: search.trim().length > 0,
    staleTime: 1000 * 60,
  });
}