/* eslint-disable indent */
import { useReducer } from "react"

const initialState = {
  url: null,
  title: null,
  isPlaying: false,
}

// TODO: Put somewhere else
const reducer = (state, action) => {
  switch (action.type) {
    case "play":
      return {
        ...state,
        url: action.url,
        title: action.title,
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

export const usePodcastStore = () => {
  return useReducer(reducer, initialState)
}
