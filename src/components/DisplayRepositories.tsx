import React from 'react';
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { GET_REPOSITORIES } from '../gql/queries/getRepositories';
import { SearchResults } from '../components/SearchResults';

export const DisplayRepositories = ({ query }: { query: string }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      repoQuery: query
    }
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return <SearchResults data={data} />;
};
