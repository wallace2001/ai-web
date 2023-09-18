import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL || process.env.NEXT_PUBLIC_DEV_BASE_URL
});