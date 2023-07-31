import { GetRepositoriesQuery } from '../gql/graphql';

// Sample mock data for testing
export const mockData: GetRepositoriesQuery = {
  search: {
    repositoryCount: 2,
    edges: [
      {
        node: {
          id: '1',
          name: 'Test Repo 1',
          url: 'https://example.com/test-repo-1',
          stargazerCount: 100,
          forkCount: 50,
          __typename: 'Repository'
        }
      },
      {
        node: {
          id: '2',
          name: 'Test Repo 2',
          url: 'https://example.com/test-repo-2',
          stargazerCount: 200,
          forkCount: 75,
          __typename: 'Repository'
        }
      }
    ],
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: 'Y3Vyc29yOjEx',
      endCursor: 'Y3Vyc29yOjIw',
      __typename: 'PageInfo'
    }
  }
};

export const invalidMockData: GetRepositoriesQuery = {
  search: {
    repositoryCount: 1,
    edges: [
      {
        node: {
          id: '3',
          name: 'Invalid Repo',
          url: 'https://example.com/invalid-repo',
          stargazerCount: 300,
          forkCount: 125
          // Missing __typename field makes this entry invalid
        }
      }
    ],
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: 'Y3Vyc29yOjEx',
      endCursor: 'Y3Vyc29yOjIw',
      __typename: 'PageInfo'
    }
  }
};
