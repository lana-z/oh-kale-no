const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

let cachedToken = null;

export async function fetchCsrfToken() {
    if (cachedToken) {
        return cachedToken;
    }

    try {
        const response = await fetch(`${VITE_API_BASE_URL}/core/get-csrf-token/`, {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const data = await response.json();
        cachedToken = data.csrfToken;
        return cachedToken;
    } catch (error) {
        throw new Error('Failed to fetch CSRF token');
    }
}

export default fetchCsrfToken;
