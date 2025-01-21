import { fetchCsrfToken, clearCachedToken } from './CsrfToken';
import { API_BASE_URL } from './config';

export async function getClaudeResponse(userInput, retryCount = 0) {
    try {
        const csrfToken = await fetchCsrfToken();
        
        // Add delay for Safari
        await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch(`${API_BASE_URL}/core/get-claude-response/`, {
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
            await new Promise(resolve => setTimeout(resolve, 500));
            return getClaudeResponse(userInput, retryCount + 1);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
