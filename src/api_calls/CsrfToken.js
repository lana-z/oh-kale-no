// Production URL
const PROD_URL = 'https://oh-kale-no-backend.onrender.com';
// Local development URL for local testing
const DEV_URL = 'http://192.168.1.41:8000';
// const DEV_URL = 'http://localhost:8000';

const VITE_API_BASE_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

let cachedToken = null;

export async function fetchCsrfToken() {
    if (cachedToken) {
        return cachedToken;
    }

    try {
        const response = await fetch(`${VITE_API_BASE_URL}/core/get-csrf-token/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const data = await response.json();
        cachedToken = data.csrfToken;
        return cachedToken;
    } catch (error) {
        console.error('CSRF Token Error:', error);
        throw error;
    }
}

export function getCachedToken() {
    return cachedToken;
}

export function clearCachedToken() {
    cachedToken = null;
}
