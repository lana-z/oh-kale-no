import { fetchCsrfToken, clearCachedToken } from './CsrfToken';

// Production URL
const PROD_URL = 'https://oh-kale-no-backend.onrender.com';
// Local development URL for local testing
const DEV_URL = 'http://192.168.1.41:8000';
// const DEV_URL = 'http://localhost:8000';

const VITE_API_BASE_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

export async function getVisitCount() {
    try {
        const response = await fetch(`${VITE_API_BASE_URL}/core/visit-count/`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Request failed`);
        }
        const data = await response.json();
        return data.count;
    } catch {
        return 0;
    }
}

export async function incrementVisitCount(retryCount = 0) {
    try {
        const csrfToken = await fetchCsrfToken();

        const response = await fetch(`${VITE_API_BASE_URL}/core/increment-visit/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': window.location.origin
            }
        });

        if (response.status === 403 && retryCount < 2) {
            clearCachedToken();
            await new Promise(resolve => setTimeout(resolve, 100));
            return incrementVisitCount(retryCount + 1);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
}
