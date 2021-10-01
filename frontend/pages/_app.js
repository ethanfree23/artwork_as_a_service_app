/* eslint-disable indent */
import { createContext, useContext, useEffect } from "react"
import App from "next/app"
import { ApolloProvider } from "@apollo/client"
import { client } from "utils/apolloClient"

import { AudioPlayer, Footer, Navbar } from "components/app"

import { fetchAPI } from "utils/request"
import { AUTH_TOKEN, getMe, useAuthStore } from "resources/auth"
import { usePodcastStore } from "resources/podcasts"

import "../styles/globals.css"

export const GlobalContext = createContext({})
export const AuthContext = createContext()
export const AudioPlayerContext = createContext()

const ConnectedApp = ({ Component, pageProps }) => {
  const { dispath } = useContext(AuthContext)

  useEffect(() => {
    let token = localStorage.getItem(AUTH_TOKEN)
    if (token !== null) {
      getMe()
        .then((res) => dispath({ type: "login", me: { ...res.me } }))
        .catch(() => localStorage.removeItem(AUTH_TOKEN))
    }
  }, [])

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <AudioPlayer />
    </>
  )
}

function MyApp({ Component, pageProps }) {
  const { global } = pageProps

  const [authState, authDispatch] = useAuthStore()
  const [audioState, audioDispatch] = usePodcastStore()

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider value={global}>
        <AuthContext.Provider value={{ auth: authState, dispath: authDispatch }}>
          <AudioPlayerContext.Provider value={{ audio: audioState, dispatch: audioDispatch }}>
            <ConnectedApp Component={Component} pageProps={pageProps} />
          </AudioPlayerContext.Provider>
        </AuthContext.Provider>
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
