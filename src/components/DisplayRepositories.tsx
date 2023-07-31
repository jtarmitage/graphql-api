import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { GET_REPOSITORIES } from '../gql/queries/getRepositories';
import { SearchResults } from '../components/SearchResults';

export const DisplayRepositories = ({ query }: { query: string }) => {
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [startCursor, setStartCursor] = useState<string | null>(null);

  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      repoQuery: query,
      first: 10
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      if (result?.search?.pageInfo?.hasNextPage) {
        setEndCursor(result.search.pageInfo.endCursor);
      } else {
        setEndCursor(null);
      }

      if (result?.search?.pageInfo?.hasPreviousPage) {
        setStartCursor(result.search.pageInfo.startCursor);
      } else {
        setStartCursor(null);
      }
    }
  });

  const handleNextPage = () => {
    fetchMore({
      variables: {
        repoQuery: query,
        first: 10,
        last: undefined,
        after: endCursor
      }
    });
  };

  const handlePreviousPage = () => {
    fetchMore({
      variables: {
        repoQuery: query,
        first: undefined,
        last: 10,
        before: startCursor
      }
    });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <SearchResults data={data} />
      <div className="pagination-buttons">
        {startCursor && (
          <Button variant="primary" onClick={handlePreviousPage}>
            Previous
          </Button>
        )}
        {endCursor && (
          <Button variant="primary" onClick={handleNextPage}>
            Next
          </Button>
        )}
      </div>
    </>
  );
};
