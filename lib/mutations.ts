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
      sharedWith {
        id
        name
        email
        image
      }
      editors
      lastEditedBy
      ownerId
      shareable
      deleteable
    }
  }
`;

export const DELETELIST = gql`
  mutation DeleteList($id: String!) {
    deleteList(listId: $id) {
      id
    }
  }
`;

export const EDITLIST = gql`
  mutation EditList($listId: String!, $contents: String!) {
    editList(listId: $listId, contents: $contents) {
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
      sharedWith {
        id
        name
        email
        image
      }
      editors
      lastEditedBy
      ownerId
      shareable
      deleteable
    }
  }
`;

export const SHARELIST = gql`
  mutation ShareList($listId: String!, $uid: String!) {
    shareList(listId: $listId, uid: $uid) {
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
      sharedWith {
        id
        name
        email
        image
      }
      editors
      lastEditedBy
      ownerId
      shareable
      deleteable
    }
  }
`;

export const MAKEVIEWEREDITOR = gql`
  mutation MakeViewerEditor($listId: String!, $uid: String!) {
    makeViewerEditor(listId: $listId, uid: $uid) {
      editors
    }
  }
`;

export const MAKEEDITORVIEWER = gql`
  mutation MakeEditorViewer($listId: String!, $uid: String!) {
    makeEditorViewer(listId: $listId, uid: $uid) {
      editors
    }
  }
`;

export const REMOVEUSERFROMLIST = gql`
  mutation RemoveUserFromList($listId: String!, $uid: String!) {
    removeUserFromList(listId: $listId, uid: $uid) {
      id
      sharedWith {
        id
        name
        email
        image
      }
      editors
    }
  }
`;

export const LEAVELIST = gql`
  mutation LeaveList($listId: String!, $uid: String!) {
    removeUserFromList(listId: $listId, uid: $uid) {
      id
    }
  }
`;
