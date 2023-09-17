import axios from "axios";

export const api = axios.create({
    baseURL: process.env.PRODUCTION_BASE_URL || process.env.DEV_BASE_URL
});