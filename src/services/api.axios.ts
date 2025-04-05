import axios from "axios";


const base = process.env.BASE_URL || "http://localhost:8000/";

export const api = axios.create({
    baseURL: base,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

