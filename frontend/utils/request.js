import axios from "axios"
import { API } from "./api"

export const request = axios.create({
  baseURL: `${API}/graphql`,
  withCredentials: true,
})

export function getStrapiURL(path = "") {
  return `${API}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path)
  const { data } = await axios.get(requestUrl)
  return data
}
