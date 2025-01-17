import { fetchCsrfToken } from './CsrfToken.js';

const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

export async function getClaudeResponse(userInput) {
    
    try {
        const csrfToken = await fetchCsrfToken(); 

        const response = await fetch(`${VITE_API_BASE_URL}/core/get-claude-response/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ user_input: userInput })
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        return "I'm taking a quick veggie break. Please try again in a moment!";
    }
}