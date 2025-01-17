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
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            console.error('CSRF Token Error:', {
                status: response.status,
                statusText: response.statusText
            });
            throw new Error('Session validation failed');
        }

        const data = await response.json();
        if (!data.csrfToken) {
            console.error('CSRF Token Error: Token not found in response');
            throw new Error('Session validation failed');
        }

        cachedToken = data.csrfToken;
        
        // Add a delay to ensure cookie is set in Safari
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return cachedToken;
    } catch (error) {
        console.error('CSRF Token Error:', error);
        throw new Error('Session validation failed');
    }
}

export default fetchCsrfToken;
