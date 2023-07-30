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
    sharedWith: [user]
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
    getAllListsWithItems(id: String!): [List]
  }

  extend type Mutation {
    createList(
      name: String!
      uid: String!
      shareable: Boolean
      deleteable: Boolean
    ): List
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
    getAllListsWithItems: async (_: any, { id }: any, { prisma }: any) => {
      const lists = await prisma.list.findMany({
        where: {
          OR: [
            {
              ownerId: id,
            },
            {
              sharedWith: {
                some: {
                  id: id,
                },
              },
            },
            {
              editors: {
                has: id,
              },
            },
          ],
        },
        include: {
          items: true,
          sharedWith: true,
        },
      });
      return lists;
    },
  },
  Mutation: {
    createList: async (
      _: any,
      { name, uid, shareable, deleteable }: any,
      { prisma }: any
    ) => {
      const list = await prisma.list.create({
        data: {
          name,
          shareable: shareable,
          deleteable: deleteable,
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
    editList: async (_: any, { listId, contents }: any, { prisma }: any) => {
      const newListContents = JSON.parse(contents);
      const list = await prisma.list.update({
        where: {
          id: listId,
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
      try {
        const newItemContents = JSON.parse(contents);
        const item = await prisma.item.create({
          data: {
            list: {
              connect: {
                id: listId,
              },
            },
            apiId: newItemContents.apiId || "",
            type: newItemContents.type || "",
            title: newItemContents.title || "",
            poster: newItemContents.poster || "",
            summary: newItemContents.summary || "",
            network: newItemContents.network || "",
            platforms: newItemContents.platforms || [],
            genres: newItemContents.genres || [],
          },
        });
        return item;
      } catch (e: any) {
        console.log(e.message);
      }
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
      const listRecord = await prisma.list.findUnique({
        where: {
          id: listId,
        },
      });
      const listExists = !!listRecord;
      const listIsDeleteable = listRecord?.deleteable;

      if (!listExists || !listIsDeleteable) return null;

      const list = await prisma.list.delete({
        where: {
          id: listId,
        },
      });
      return list;
    },
    shareList: async (_: any, { listId, uid }: any, { prisma }: any) => {
      const userRecord = await prisma.user.findUnique({
        where: {
          id: uid,
        },
      });
      const userExists = !!userRecord;

      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
      });

      if (!userExists || !list || !list.shareable) return null;

      const updatedUser = await prisma.user.update({
        where: {
          id: uid,
        },
        data: {
          listsSharedWith: {
            connect: {
              id: listId,
            },
          },
        },
      });

      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          sharedWith: {
            connect: {
              id: uid,
            },
          },
        },
        include: {
          sharedWith: true,
        },
      });
      return returnList;
    },
    makeViewerEditor: async (_: any, { listId, uid }: any, { prisma }: any) => {
      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
        include: {
          sharedWith: true,
        },
      });

      let isSharedWithUser =
        list.sharedWith.filter((sharedUser: any) => sharedUser.id === uid)
          .length > 0;

      if (!list || !isSharedWithUser) return null;

      let editors = [...list.editors, uid];
      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          editors: editors,
        },
      });
      return returnList;
    },
    makeEditorViewer: async (_: any, { listId, uid }: any, { prisma }: any) => {
      const list = await prisma.list.findUnique({
        where: {
          id: listId,
        },
        include: {
          sharedWith: true,
        },
      });

      let isSharedWithUser =
        list.sharedWith.filter((sharedUser: any) => sharedUser.id === uid)
          .length > 0;

      if (!list || !isSharedWithUser) return null;

      let editors = list.editors.filter((user: string) => user !== uid);
      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          editors: editors,
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
        include: {
          sharedWith: true,
        },
      });
      let editors = list.editors.filter((user: string) => user !== uid);

      const returnList = await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          editors: editors,
          sharedWith: {
            disconnect: {
              id: uid,
            },
          },
        },
        include: {
          sharedWith: true,
        },
      });
      return returnList;
    },
  },
};
