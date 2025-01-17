import { fetchCsrfToken } from './CsrfToken';

// Production URL
const PROD_URL = 'https://oh-kale-no-backend.onrender.com';
// Local development URL for local testing
const DEV_URL = 'http://192.168.1.41:8000';

const VITE_API_BASE_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

export async function getClaudeResponse(userInput) {
    try {
        const csrfToken = await fetchCsrfToken();

        const response = await fetch(`${VITE_API_BASE_URL}/core/get-claude-response/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ user_input: userInput })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error:', {
                status: response.status,
                data: errorData
            });
            throw new Error('Unable to process request');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Chat Error:', error);
        return "Looks like I have a veggie jam in my Ninja! Please try again in a moment.";
    }
}