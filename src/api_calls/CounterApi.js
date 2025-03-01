import { fetchCsrfToken, clearCachedToken } from './CsrfToken';
import { API_BASE_URL } from './config';

export async function getVisitCount() {
    try {
        // Add delay for Safari
        await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch(`${API_BASE_URL}/core/visit-count/`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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

export async function incrementVisitCount(retryCount = 0) {
    try {
        const csrfToken = await fetchCsrfToken();
        
        // Add delay for Safari
        await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch(`${API_BASE_URL}/core/increment-visit/`, {
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
            await new Promise(resolve => setTimeout(resolve, 500));
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
