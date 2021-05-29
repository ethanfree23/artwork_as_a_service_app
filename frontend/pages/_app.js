import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "utils/appolloClient"

import { Navbar } from "components/app"

import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
