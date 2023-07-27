import React from 'react';
import { render } from '@testing-library/react';
import { GetRepositoriesQuery } from '../gql/graphql';
import { SearchResults } from './SearchResults';

// Sample mock data for the test
const mockData: GetRepositoriesQuery = {
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
    ]
  }
};

describe('SearchResults', () => {
  test('renders the table with repository data', () => {
    const { getByText, getByTestId } = render(<SearchResults data={mockData} />);

    // Test header row
    const headerRow = getByTestId('header-row');
    expect(headerRow).toBeInTheDocument();

    // Test table headers
    expect(getByText('Repository Name')).toBeInTheDocument();
    expect(getByText('🌟 Stars')).toBeInTheDocument();
    expect(getByText('🍴 Forks')).toBeInTheDocument();

    // Test repository data rows
    const repo1Row = getByText('Test Repo 1');
    expect(repo1Row).toBeInTheDocument();
    expect(getByText('🌟 100')).toBeInTheDocument();
    expect(getByText('🍴 50')).toBeInTheDocument();

    const repo2Row = getByText('Test Repo 2');
    expect(repo2Row).toBeInTheDocument();
    expect(getByText('🌟 200')).toBeInTheDocument();
    expect(getByText('🍴 75')).toBeInTheDocument();
  });

  test('does not render invalid repository data', () => {
    // Modify the mockData to include an invalid entry
    const invalidMockData: GetRepositoriesQuery = {
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
        ]
      }
    };

    const { queryByText } = render(<SearchResults data={invalidMockData} />);

    // The invalid repository data should not be rendered
    expect(queryByText('Invalid Repo')).toBeNull();
    expect(queryByText('🌟 300')).toBeNull();
    expect(queryByText('🍴 125')).toBeNull();
  });
});
