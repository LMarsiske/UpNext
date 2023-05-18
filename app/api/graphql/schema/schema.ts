import { merge } from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Show, resolvers as showResolvers } from "./show";

const Query = `#graphql
    type Query {
        _empty: String
    }
`;

const resolvers = {};

const schema = {
  typeDefs: [Query, Show],
  resolvers: merge(resolvers),
};

export default schema;
