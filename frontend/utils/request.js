import axios from "axios"
import { API } from "./api"

export const request = axios.create({
  baseURL: `${API}/graphql`,
  withCredentials: true,
})
