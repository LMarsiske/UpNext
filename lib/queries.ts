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
        sharedWith {
          id
          email
          name
          image
        }
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

export const SEARCHUSERS = gql`
  query SearchUsers($email: String!) {
    findUsersByEmail(email: $email) {
      id
      name
      email
      image
      createdAt
      updatedAt
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
      sharedWith {
        id
        email
        name
        image
      }
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
        listId
      }
      sharedWith {
        id
        email
        name
        image
      }
      editors
      shareable
      deleteable
    }
  }
`;

export const GETMOVIE = gql`
  query GetMovie($id: String!) {
    getMovie(id: $id) {
      id
      adult
      backdrop_path
      genre_ids
      original_language
      original_title
      summary
      popularity
      poster
      release_date
      release_year
      title
      video
      vote_average
      vote_count
      cast {
        name
        character
      }
      providers {
        name
        logo
      }
    }
  }
`;

export const GETSHOW = gql`
  query GetTV($id: String!) {
    getTV(id: $id) {
      id
      url
      title
      type
      language
      genres
      status
      runtime
      averageRuntime
      premiered
      ended
      officialSite
      summary
      updated
      cast {
        name
        character
      }
      poster
      release_year
    }
  }
`;

export const GETGAME = gql`
  query GetGame($id: String!) {
    getGame(id: $id) {
      id
      title
      summary
      platforms
      release_year
      poster
    }
  }
`;

export const GETIGDBAUTHTOKEN = gql`
  query GetIGDBAuthToken {
    getIGDBAuthToken
  }
`;
