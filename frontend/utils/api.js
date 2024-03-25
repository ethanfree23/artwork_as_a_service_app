import axios from "axios"

export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const request = (method, path, data) => {
  const headers = {
    Accept: "application/json",
  }
  return axios.request({
    headers: headers,
    url: `${API}/${path}`,
    method: method,
    responseType: "json",
    contentType: "application/json",
    data,
  })
}

export const protectedRequest = (method, path, data, responseType = "json") => {
  let token

  if (process.browser) {
    token = localStorage.getItem("authToken")
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return axios.request({
    headers: headers,
    url: `${API}/${path}`,
    method: method,
    responseType,
    data: data,
  })
}
