import { merge } from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Show, resolvers as showResolvers } from "./show";
import gql from "graphql-tag";

const Query = gql`
  type Query {
    _empty: String
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [Query, Show],
  resolvers: merge(resolvers, showResolvers),
});

export default schema;
