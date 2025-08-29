import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 5000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'  // ✅ This tells backend to parse JSON
    // You can keep or remove 'X-Custom-Header'
  }
});

export default axiosClient;
