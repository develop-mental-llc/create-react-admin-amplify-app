/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  id?: string | null,
  title: string,
  body: string,
  teaser?: string | null,
  published_at: string,
  average_note?: string | null,
  views: number,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  teaser?: ModelStringInput | null,
  published_at?: ModelStringInput | null,
  average_note?: ModelStringInput | null,
  views?: ModelIntInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  teaser?: string | null,
  published_at?: string | null,
  average_note?: string | null,
  views?: number | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  teaser?: ModelStringInput | null,
  published_at?: ModelStringInput | null,
  average_note?: ModelStringInput | null,
  views?: ModelIntInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      body: string,
      teaser: string | null,
      published_at: string,
      average_note: string | null,
      views: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type PostsByViewQueryVariables = {
  views?: number | null,
  published_at?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByViewQuery = {
  postsByView:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      body: string,
      teaser: string | null,
      published_at: string,
      average_note: string | null,
      views: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost:  {
    __typename: "Post",
    id: string,
    title: string,
    body: string,
    teaser: string | null,
    published_at: string,
    average_note: string | null,
    views: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
