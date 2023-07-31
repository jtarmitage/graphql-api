import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: {
          keyArgs: false, // This tells Apollo Client to use a single key for the search field
          merge(_existing, incoming) {
            const { edges: incomingEdges, pageInfo: incomingPageInfo } = incoming;

            return {
              ...incoming,
              edges: incomingEdges,
              pageInfo: incomingPageInfo
            };
          }
        }
      }
    }
  }
});

export default cache;
