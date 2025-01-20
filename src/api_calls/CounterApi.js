import { fetchCsrfToken } from './CsrfToken';

// Production URL
const PROD_URL = 'https://oh-kale-no-backend.onrender.com';
// Local development URL for local testing
const DEV_URL = 'http://192.168.1.41:8000';
// const DEV_URL = 'http://localhost:8000';

const VITE_API_BASE_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

export async function getVisitCount() {
    try {
        const response = await fetch(`${VITE_API_BASE_URL}/core/visit-count/`, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`Request failed`);
        }
        const data = await response.json();
        return data.count;
    } catch (error) {
        return 0;
    }
}

export async function incrementVisitCount() {
    try {
        const { csrfToken } = await fetchCsrfToken();

        const response = await fetch(`${VITE_API_BASE_URL}/core/increment-visit/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
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
