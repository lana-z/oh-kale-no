import { API_BASE_URL } from './config';

let cachedToken = null;

export async function fetchCsrfToken() {
    if (cachedToken) {
        return cachedToken;
    }

    // Add delay for Safari
    // await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const response = await fetch(`${API_BASE_URL}/core/get-csrf-token/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const data = await response.json();
        
        // Add logging to debug Safaritoken issue
        console.log('New CSRF token fetched:', data.csrfToken);
        console.log('Cookies:', document.cookie);
        
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
    console.log('Clearing cached token:', cachedToken);
    cachedToken = null;
}
