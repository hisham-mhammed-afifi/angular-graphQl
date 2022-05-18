import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_POSTS = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
    }
  }
`;
const CREATE_POST = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;
const DELETE_POST = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;
const UPDATE_POST = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apollo: Apollo) {}

  all() {
    return this.apollo.watchQuery<any>({
      query: GET_POSTS,
    }).valueChanges;
  }
  create(post: any) {
    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: {
        input: {
          title: post.title,
          body: post.body,
        },
      },
    });
  }
  update() {
    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: {
        id: 1,
        input: {
          title: 'This new title.',
          body: 'Some updated content.',
        },
      },
    });
  }
  delete(id: number) {
    return this.apollo.mutate({
      mutation: DELETE_POST,
      variables: {
        id,
      },
    });
  }
}
