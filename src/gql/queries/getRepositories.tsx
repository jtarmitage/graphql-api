import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($repoQuery: String!) {
    search(query: $repoQuery, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            url
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;
