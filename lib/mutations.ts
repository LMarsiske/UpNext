import { gql } from "@apollo/client";

export const CREATELIST = gql`
  mutation CreateList($name: String!, $uid: String!) {
    createList(name: $name, uid: $uid) {
      id
      name
      createdAt
      updatedAt
      items {
        id
        listId
        createdAt
        updatedAt
        apiId
        type
        title
        poster
        summary
        network
        platforms
        genres
      }
      sharedWith
      editors
      lastEditedBy
      ownerId
      shareable
      deleteable
    }
  }
`;
