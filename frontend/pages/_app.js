/* eslint-disable indent */
import { createContext, useReducer } from "react"
import App from "next/app"
import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "utils/appolloClient"

import { AudioPlayer, Footer, Navbar } from "components/app"

import "../styles/globals.css"
import { fetchAPI } from "utils/request"

export const GlobalContext = createContext({})

export const AudioPlayerContext = createContext()

// TODO: Put somewhere else
const reducer = (state, action) => {
  switch (action.type) {
    case "play":
      return {
        ...state,
        url: action.url,
      }
    case "close":
      return {
        ...state,
        url: null,
      }
    default:
      return state
  }
}

function MyApp({ Component, pageProps }) {
  const { global } = pageProps

  const [audio, dispatch] = useReducer(reducer, { url: null })

  return (
    <ApolloProvider client={createApolloClient()}>
      <GlobalContext.Provider value={global}>
        <AudioPlayerContext.Provider value={{ audio, dispatch }}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <AudioPlayer />
        </AudioPlayerContext.Provider>
      </GlobalContext.Provider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const global = await fetchAPI("/global")
  return { ...appProps, pageProps: { global } }
}

export default MyApp
