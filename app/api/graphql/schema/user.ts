import gql from "graphql-tag";
export const typeDef = gql`
  type Item {
    id: String!
    list: List!
    listId: String!
    createdAt: String!
    updatedAt: String!
    apiId: String!
    type: String!
    title: String!
    poster: String
    summary: String
    network: String
    platforms: [String]
    genres: [String]
  }
  type List {
    id: String!
    name: String!
    owner: user!
    createdAt: String!
    updatedAt: String!
    items: [Item]
    sharedWith: [String]
    editors: [String]
    lastEditedBy: String
  }
  type user {
    id: String!
    name: String!
    email: String!
    emailVerified: Boolean!
    image: String!
    createdAt: String!
    updatedAt: String!
    lists: [List]
  }

  extend type Query {
    getUser(id: String!): user
  }
`;

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: any, { prisma }: any) => {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          lists: true,
        },
      });
      return user;
    },
  },
};
