import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { ReactNode } from "react";
import { useUserSelectors } from "@/stores/user";

interface ApolloProviderProps {
  children: ReactNode;
}

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const igdbAuthToken = useUserSelectors.getState().igdbAuthToken;

  return {
    headers: {
      ...headers,
      authorization: session?.token || "",
      igdbauthtoken: igdbAuthToken || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloContextProvider = ({ children }: ApolloProviderProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
