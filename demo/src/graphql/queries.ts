/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      body
      teaser
      published_at
      average_note
      views
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        body
        teaser
        published_at
        average_note
        views
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByView = /* GraphQL */ `
  query PostsByView(
    $views: Int
    $published_at: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByView(
      views: $views
      published_at: $published_at
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        body
        teaser
        published_at
        average_note
        views
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
