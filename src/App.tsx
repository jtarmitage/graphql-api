import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
  query {
    search(query: "topic:react", type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
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

interface RepositoryInfo {
  id: string;
  name: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

interface Repositories {
  [node: string]: RepositoryInfo;
}

function DisplayRepositories() {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.search.edges.map(({ node }: Repositories) => (
    <ul key={node.id}>
      <li>
        <span>
          <a href={node.url}>{node.name}</a> - 🌟 {node.stargazerCount} - 🍴 {node.forkCount}
        </span>
      </li>
    </ul>
  ));
}

function App() {
  return (
    <div className="App">
      <DisplayRepositories />
    </div>
  );
}

export default App;
