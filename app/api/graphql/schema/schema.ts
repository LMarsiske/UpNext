import { merge } from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Show, resolvers as showResolvers } from "./show";
import { typeDef as Movie, resolvers as movieResolvers } from "./movie";
import { typeDef as Game, resolvers as gameResolvers } from "./game";
import gql from "graphql-tag";

const Query = gql`
  type Query {
    _empty: String
  }

  type SearchResult {
    id: ID!
    type: String!
    title: String!
    poster: String
    summary: String
    network: String
    platforms: [String]
    genres: [String]
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [Query, Show, Movie, Game],
  resolvers: merge(resolvers, showResolvers, movieResolvers, gameResolvers),
});

export default schema;
