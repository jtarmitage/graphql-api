import React from 'react';
import { useQuery, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { GetRepositoriesQuery } from './gql/graphql';
import Header from './components/Header';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

const GET_REPOSITORIES = gql`
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

function SearchResults({ data }: { data: GetRepositoriesQuery }) {
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
}

function DisplayRepositories({ query }: { query: string }) {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      repoQuery: query
    }
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return <SearchResults data={data} />;
}

function App() {
  return (
    <>
      <Container>
        <Header />
        <div className="App">
          <DisplayRepositories query="topic:react" />
        </div>
      </Container>
    </>
  );
}

export default App;
