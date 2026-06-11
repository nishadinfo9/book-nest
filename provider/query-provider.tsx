"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => {
  return new QueryClient();
};

const getQueryClient = () => {
  //on server
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    //on client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
};

const queryClient = getQueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
