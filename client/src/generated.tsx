import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:8080/", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json","Authorization":"Bearer process.env.HEADER_AUTH_TOKEN"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Author = {
  __typename?: 'Author';
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  id: Scalars['Int'];
  picture: Scalars['String'];
  posts?: Maybe<Array<Post>>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  post: Post;
  replyTo?: Maybe<Comment>;
  text: Scalars['String'];
  username: Scalars['String'];
};

export type CreateCommentInput = {
  replyToId?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostInput = {
  authorId: Scalars['Int'];
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createPost?: Maybe<Post>;
  publishPost?: Maybe<Post>;
};


export type MutationCreateCommentArgs = {
  input?: InputMaybe<CreateCommentInput>;
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input?: InputMaybe<CreatePostInput>;
};


export type MutationPublishPostArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author: Author;
  comments?: Maybe<Array<Comment>>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allPosts?: Maybe<Array<Post>>;
  author?: Maybe<Author>;
  post?: Maybe<Post>;
};


export type QueryAuthorArgs = {
  id: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', allPosts?: Array<{ __typename?: 'Post', id: number, title: string, publishedAt?: any | null, content?: string | null, author: { __typename?: 'Author', displayName: string, picture: string }, comments?: Array<{ __typename?: 'Comment', id: number, text: string, username: string }> | null }> | null };


export const AllPostsDocument = `
    query AllPosts {
  allPosts {
    id
    author {
      displayName
      picture
    }
    title
    publishedAt
    content
    comments {
      id
      text
      username
    }
  }
}
    `;
export const useAllPostsQuery = <
      TData = AllPostsQuery,
      TError = unknown
    >(
      variables?: AllPostsQueryVariables,
      options?: UseQueryOptions<AllPostsQuery, TError, TData>
    ) =>
    useQuery<AllPostsQuery, TError, TData>(
      variables === undefined ? ['AllPosts'] : ['AllPosts', variables],
      fetcher<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, variables),
      options
    );