import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

interface ApolloProviderProps {
  children: ReactNode;
}

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

//localhost:3000/api

export const ApolloContextProvider = ({ children }: ApolloProviderProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
