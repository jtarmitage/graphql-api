import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DisplayRepositories } from './DisplayRepositories';
import { useQuery as originalUseQuery } from '@apollo/client';
import { mockData } from '../services/mockedData';

// Mock the useQuery function
const useQuery = originalUseQuery as jest.Mock;

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('DisplayRepositories', () => {
  beforeEach(() => {
    // Reset the mock before each test to reset the mock return values
    useQuery.mockReset();
  });

  test('renders Loading component when loading is true', () => {
    useQuery.mockReturnValueOnce({ loading: true });

    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DisplayRepositories query="test" />
      </MockedProvider>
    );

    const loadingComponent = getByTestId('loading-component');
    expect(loadingComponent).toBeInTheDocument();
  });

  test('renders ErrorMessage component when error occurs', () => {
    const errorMessage = 'Something went wrong!';
    useQuery.mockReturnValueOnce({ loading: false, error: new Error(errorMessage) });

    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DisplayRepositories query="test" />
      </MockedProvider>
    );

    const errorComponent = getByTestId('error-message');
    expect(errorComponent).toBeInTheDocument();
    expect(errorComponent.textContent).toContain(errorMessage);
  });

  test('renders SearchResults component when data is available', () => {
    useQuery.mockReturnValueOnce({ loading: false, data: mockData });

    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DisplayRepositories query="test" />
      </MockedProvider>
    );

    const searchResultsComponent = getByTestId('search-results');
    expect(searchResultsComponent).toBeInTheDocument();
  });
});
