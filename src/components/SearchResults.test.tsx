import React from 'react';
import { render } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { mockData, invalidMockData } from '../services/mockedData';

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
    const { queryByText } = render(<SearchResults data={invalidMockData} />);

    // The invalid repository data should not be rendered
    expect(queryByText('Invalid Repo')).toBeNull();
    expect(queryByText('🌟 300')).toBeNull();
    expect(queryByText('🍴 125')).toBeNull();
  });
});
