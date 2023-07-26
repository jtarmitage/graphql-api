import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { GetRepositoriesQuery } from './gql/graphql';
import Header from './components/Header';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import SearchInput from './components/SearchInput';
import { GET_REPOSITORIES } from './gql/queries/getRepositories';

const SearchResults = ({ data }: { data: GetRepositoriesQuery }) => {
  const repositories = data.search.edges;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Repository Name</th>
          <th>🌟 Stars</th>
          <th>🍴 Forks</th>
        </tr>
      </thead>
      <tbody>
        {repositories &&
          repositories.map((edge) => {
            if (edge && edge.node && edge.node.__typename === 'Repository') {
              const { id, name, url, stargazerCount, forkCount } = edge.node;
              return (
                <tr key={id}>
                  <td>
                    <a href={url}>{name}</a>
                  </td>
                  <td>🌟 {stargazerCount}</td>
                  <td>🍴 {forkCount}</td>
                </tr>
              );
            }
          })}
      </tbody>
    </Table>
  );
};

const DisplayRepositories = ({ query }: { query: string }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      repoQuery: query
    }
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return <SearchResults data={data} />;
};

const App = () => {
  const [searchValue, setSearchValue] = useState('topic:react');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <Container>
        <Header />
        <SearchInput onChange={handleSearchChange} />
        <DisplayRepositories query={searchValue} />
      </Container>
    </>
  );
};

export default App;
