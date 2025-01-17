const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

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
        const csrfResponse = await fetch(`${VITE_API_BASE_URL}/core/get-csrf-token/`, {
            credentials: 'include'
        });
        const { csrfToken } = await csrfResponse.json();

        const response = await fetch(`${VITE_API_BASE_URL}/core/increment-visit/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
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
