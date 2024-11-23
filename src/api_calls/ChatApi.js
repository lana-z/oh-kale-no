import { fetchCsrfToken } from './CsrfToken.js';

const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

export async function getClaudeResponse(userPrompt) {
    
    try {
        const csrftoken = await fetchCsrfToken(); //Use cached token if available
        console.log('Making request to get-claude-response with:');
        console.log('- CSRF token:', csrftoken);
        console.log('- User prompt:', userPrompt);
        console.log('- URL:', `${VITE_API_BASE_URL}/core/get-claude-response/`);

        const response = await fetch(`${VITE_API_BASE_URL}/core/get-claude-response/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken, 
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ userPrompt })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers]));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response not OK: ', response.status, errorText);
            console.error('Request headers: ', Object.fromEntries([...response.headers]));
            throw new Error(`HTTP error! Status: ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching Claude response: ', error);
        return "Sorry, there seems to be a veggie jam in my Ninja. Please try again later.";
    }
}