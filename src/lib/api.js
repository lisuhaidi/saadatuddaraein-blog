import axios from 'axios';

const DEFAULT_API_BASE = 'http://localhost:8001/api/v1/';

// Vite/ Astro exposes env vars via import.meta.env and requires the VITE_ prefix.
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
	? import.meta.env.VITE_API_BASE_URL
	: DEFAULT_API_BASE;

const api = axios.create({
	baseURL: API_BASE,
	headers: {
		'Content-Type': 'application/json'
	}
});

export default api;

export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const del = (url, config) => api.delete(url, config);

export const setAuthToken = (token) => {
	if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	else delete api.defaults.headers.common['Authorization'];
};

api.interceptors.response.use(
  (res) => {
    console.log("[API RESPONSE]", res.config.url, res.data);
    return res;
  },
  (err) => {
    console.log("[API ERROR]", err.config?.url, err.response?.data);
    return Promise.reject(err);
  }
);


export const getBaseUrl = () => API_BASE;
