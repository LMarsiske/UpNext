import { merge } from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Show, resolvers as showResolvers } from "./show";
import { typeDef as Movie, resolvers as movieResolvers } from "./movie";
import { typeDef as Game, resolvers as gameResolvers } from "./game";
import { typeDef as User, resolvers as userResolvers } from "./user";
import { typeDef as List, resolvers as listResolvers } from "./list";
import gql from "graphql-tag";

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type SearchResult {
    id: ID
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
  typeDefs: [Query, Show, Movie, Game, User, List],
  resolvers: merge(
    resolvers,
    showResolvers,
    movieResolvers,
    gameResolvers,
    userResolvers,
    listResolvers
  ),
});

export default schema;
