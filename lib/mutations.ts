import { gql } from "@apollo/client";

export const CREATELIST = gql`
  mutation CreateList(
    $name: String!
    $uid: String!
    $shareable: Boolean
    $deleteable: Boolean
  ) {
    createList(
      name: $name
      uid: $uid
      shareable: $shareable
      deleteable: $deleteable
    ) {
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
