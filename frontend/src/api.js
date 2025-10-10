import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//export const N8N_WEBHOOK_URL = window.configs.VITE_N8N_WEBHOOK_URL;
// export const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
export const N8N_WEBHOOK_URL =
  "https://n8n.srv917216.hstgr.cloud/webhook/02f40ff6-5e6a-4b2a-a21f-46be53dd6d5c";

const apiUrl = "/choreo-apis/dajngo-react-web-app/backend/v1";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
