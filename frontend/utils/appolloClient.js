import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache, gql } from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
// import { onError } from "@apollo/client/link/error"
import { ApolloLink } from "apollo-link"

import { useRouter } from "next/router"
import { API } from "./api"

const httpLink = createHttpLink({
  uri: `${API}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// Something like this for artists routes
// const errorLink = (router) => {
//   onError(({ response, ...rest }) => {
//     if (
//       response?.errors[0]?.extensions?.exception?.output?.statusCode === 401 ||
//       response?.errors[0]?.extensions?.exception?.output?.statusCode === 403
//     ) {
//       localStorage.removeItem("authToken");
//       router.push("/");
//     }
//   });
// };

const links = (router) =>
  // ApolloLink.from([authLink, errorLink(router), httpLink]);
  ApolloLink.from([authLink, httpLink])

export function createApolloClient() {
  const router = useRouter()
  return new ApolloClient({
    // link: authLink.concat(httpLink),
    link: links(router),
    cache: new InMemoryCache(),
  })
}

export const client = new ApolloClient({
  uri: `${API}/graphql`,
  cache: new InMemoryCache(),
})

export const useQuery = async (query, variables) => {
  return await client.query({
    query: query,
    variables: variables,
  })
}

export { gql }
