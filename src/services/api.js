import axios from "axios";


const token = localStorage.getItem("tokenAuth")
const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export default api;

export const API_URL = 'http://localhost:3333/'