import React from 'react';
import { GetRepositoriesQuery } from '../gql/graphql';
import Table from 'react-bootstrap/Table';

export const SearchResults = ({ data }: { data: GetRepositoriesQuery }) => {
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
