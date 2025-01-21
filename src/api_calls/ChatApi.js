import { fetchCsrfToken, clearCachedToken } from './CsrfToken';

// Production URL
const PROD_URL = 'https://oh-kale-no-backend.onrender.com';
// Local development URL for local testing
const DEV_URL = 'http://192.168.1.41:8000';

const VITE_API_BASE_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

export async function getClaudeResponse(userInput, retryCount = 0) {
    try {
        const csrfToken = await fetchCsrfToken();

        const response = await fetch(`${VITE_API_BASE_URL}/core/get-claude-response/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': window.location.origin
            },
            body: JSON.stringify({ user_input: userInput })
        });

        if (response.status === 403 && retryCount < 2) {
            clearCachedToken();
            // Add small delay before retry to ensure cookie processing
            await new Promise(resolve => setTimeout(resolve, 100));
            return getClaudeResponse(userInput, retryCount + 1);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.message;  // Changed from data.response to match backend response
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
