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

const audioInitialState = {
  url: null,
  isPlaying: false,
}

// TODO: Put somewhere else
const reducer = (state, action) => {
  switch (action.type) {
    case "play":
      return {
        ...state,
        url: action.url,
        isPlaying: true,
      }
    case "pause":
      return {
        ...state,
        isPlaying: false,
      }
    case "close":
      return {
        ...state,
        url: null,
        isPlaying: false,
      }
    default:
      return state
  }
}

function MyApp({ Component, pageProps }) {
  const { global } = pageProps
  const [audio, dispatch] = useReducer(reducer, audioInitialState)

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
