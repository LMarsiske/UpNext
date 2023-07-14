import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($q: String!) {
    searchGames(q: $q) {
      id
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
    searchMovies(q: $q) {
      id
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
    searchTV(q: $q) {
      id
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
  }
`;

export const GETUSER = gql`
  query GetUser($id: String!) {
    getUserWithListsWithItems(id: $id) {
      id
      name
      email
      image
      createdAt
      updatedAt
      lists {
        id
        name
        createdAt
        updatedAt
        sharedWith
        editors
        lastEditedBy
        ownerId
        shareable
        deleteable
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
      }
    }
  }
`;

export const ADDITEMTOLIST = gql`
  mutation addItemToList($id: String!, $contents: String!) {
    addItemToList(listId: $id, contents: $contents) {
      id
      apiId
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
  }
`;

export const DELETEITEMFROMLIST = gql`
  mutation deleteItemFromList($id: String!) {
    deleteItemFromList(itemId: $id) {
      id
    }
  }
`;

export const GETLISTS = gql`
  query GetLists($id: String!) {
    getAllLists(id: $id) {
      id
      name
      ownerId
      sharedWith
      editors
      shareable
      deleteable
    }
  }
`;

export const GETLISTSWITHITEMS = gql`
  query GetListsWithItems($id: String!) {
    getAllListsWithItems(id: $id) {
      id
      name
      ownerId
      items {
        id
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
      shareable
      deleteable
    }
  }
`;
