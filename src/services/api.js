import axios from "axios";

export const API_URL = 'http://localhost:3333/'

const token = localStorage.getItem("tokenAuth")
const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export default api;