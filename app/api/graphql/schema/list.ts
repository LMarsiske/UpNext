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
    ownerId: String!
    createdAt: String!
    updatedAt: String!
    items: [Item]
    sharedWith: [String]
    editors: [String]
    shareable: Boolean!
    deleteable: Boolean!
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
    getList(id: String!): List
    getAllLists(id: String!): [List]
  }

  extend type Mutation {
    createList(name: String!, uid: String!): List
    editList(listId: String!, contents: String!): List
    addItemToList(listId: String!, contents: String!): Item
    deleteItemFromList(itemId: String!): Item
    deleteList(listId: String!): List
    shareList(listId: String!, uid: String!): List
    makeViewerEditor(listId: String!, uid: String!): List
    makeEditorViewer(listId: String!, uid: String!): List
    removeUserFromList(listId: String!, uid: String!): List
    leaveList(listId: String!, uid: String!): List
  }
`;

export const resolvers = {
  Query: {
    getList: async (_: any, { id }: any, { prisma }: any) => {
      const list = await prisma.list.findUnique({
        where: {
          id: id,
        },
        include: {
          items: true,
        },
      });
      return list;
    },
    getAllLists: async (_: any, { id }: any, { prisma }: any) => {
      const lists = await prisma.list.findMany({
        where: {
          OR: [
            {
              ownerId: id,
            },
            {
              sharedWith: {
                has: id,
              },
            },
            {
              editors: {
                has: id,
              },
            },
          ],
        },
      });
      return lists;
    },
  },
  Mutation: {
    createList: async (_: any, { name, uid }: any, { prisma }: any) => {
      const list = await prisma.list.create({
        data: {
          name,
          owner: {
            connect: {
              id: uid,
            },
          },
          lastEditedBy: null,
        },
      });
      return list;
    },
    editList: async (_: any, { id, contents }: any, { prisma }: any) => {
      const newListContents = JSON.parse(contents);
      const list = await prisma.list.update({
        where: {
          id: id,
        },
        data: {
          name: newListContents.name || undefined,
          sharedWith: newListContents.sharedWith || undefined,
          editors: newListContents.editors || undefined,
          lastEditedBy: newListContents.lastEditedBy || undefined,
        },
      });
      return list;
    },
    addItemToList: async (
      _: any,
      { listId, contents }: any,
      { prisma }: any
    ) => {
      const newItemContents = JSON.parse(contents);
      const item = await prisma.item.create({
        data: {
          list: {
            connect: {
              id: listId,
            },
          },
          apiId: newItemContents.apiId,
          type: newItemContents.type,
          title: newItemContents.title,
          poster: newItemContents.poster,
          summary: newItemContents.summary,
          network: newItemContents.network,
          platforms: newItemContents.platforms,
          genres: newItemContents.genres,
        },
      });
      return item;
    },
    deleteItemFromList: async (_: any, { itemId }: any, { prisma }: any) => {
      const item = await prisma.item.delete({
        where: {
          id: itemId,
        },
      });
      return item;
    },
    deleteList: async (_: any, { listId }: any, { prisma }: any) => {
      const list = await prisma.list.delete({
        where: {
          id: listId,
        },
      });
      return list;
    },
    shareList: async (_: any, { listId, uid }: any, { prisma }: any) => {
      let userExists = !!(await prisma.user.findUnique({
        where: {
          id: uid,
        },
      }));
      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
      });
      if (!userExists || !list || !list.shareable) return null;
      let sharedWith = [...list.sharedWith, uid];
      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          sharedWith: sharedWith,
        },
      });
      return returnList;
    },
    makeViewerEditor: async (_: any, { listId, uid }: any, { prisma }: any) => {
      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
      });
      let editors = [...list.editors, uid];
      let sharedWith = list.sharedWith.filter((user: string) => user !== uid);
      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          editors: editors,
          sharedWith: sharedWith,
        },
      });
      return returnList;
    },
    makeEditorViewer: async (_: any, { listId, uid }: any, { prisma }: any) => {
      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
      });
      let editors = list.editors.filter((user: string) => user !== uid);
      let sharedWith = [...list.sharedWith, uid];
      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          editors: editors,
          sharedWith: sharedWith,
        },
      });
      return returnList;
    },
    removeUserFromList: async (
      _: any,
      { listId, uid }: any,
      { prisma }: any
    ) => {
      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
      });
      let editors = list.editors.filter((user: string) => user !== uid);
      let sharedWith = list.sharedWith.filter((user: string) => user !== uid);
      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          editors: editors,
          sharedWith: sharedWith,
        },
      });
      return returnList;
    },
  },
};