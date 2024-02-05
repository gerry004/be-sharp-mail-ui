import axios from 'axios';

let baseURL = 'http://localhost:5000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://be-sharp-mail-api.onrender.com';
}

const api = axios.create({
  baseURL: baseURL,
});

export default api;