// Central configuration file for API settings
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    console.error('API Base URL not configured. Please check your environment variables.');
}