import axios from "axios";

const fetchClient = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  headers: {
    "Content-Type": "application/json",
    "fetch-api-key": import.meta.env.VITE_FETCH_API_KEY,
  },
  withCredentials: true,
});

fetchClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // On unauthorized requests, hard refresh to login screen
    if (error.response.status == 401) window.location.assign("/");
    console.log(error);
    return error.response;
  }
);

export default fetchClient;
