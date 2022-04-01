import { ApolloClient, createHttpLink, InMemoryCache, gql, useMutation } from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
import { ApolloLink } from "apollo-link"

import { API } from "./api"

const httpLink = createHttpLink({
  uri: `${API}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  let token

  if (process.browser) {
    token = localStorage.getItem("authToken")
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const links = () => ApolloLink.from([authLink, httpLink])

export const client = new ApolloClient({
  link: links(),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
  },
})

//Currently only using in getStaticProps
export const useQuery = async (query, variables) => {
  return await client.query({
    query: query,
    variables: variables,
  })
}

// export const useMutation = async (mutation, options) => {
//   return await client.mutate({
//     mutation: mutation,
//     ...options,
//   })
// }

export { gql, useMutation }

//
//
//
//
//
//
//

// import { onError } from "@apollo/client/link/error"
// import { useRouter } from "next/router"

// const links = (router) =>
// ApolloLink.from([authLink, errorLink(router), httpLink]);

// export function createApolloClient() {
//   const router = useRouter()
//   return new ApolloClient({
//     // link: authLink.concat(httpLink),
//     link: links(router),
//     cache: new InMemoryCache(),
//   })
// }

// export const useMutation = async (mutation, variables) => {
//   return await client.mutate({
//     mutation: mutation,
//     // variables: variables,
//   })
// }

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
