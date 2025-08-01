import axios from "axios";

//in production, there is no localhost so we have to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"
const api = axios.create({
  baseURL: BASE_URL, // Adjust the base URL as needed
   // Set a timeout for requests 
})

export default api;