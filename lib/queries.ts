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
      lists {
        id
        name
        items {
          id
          title
          apiId
          type
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
