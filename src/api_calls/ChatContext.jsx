const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';


async function fetchCsrfToken() {
    try {
        console.log('Fetching CSRF token...');
        const response = await fetch(`${VITE_API_BASE_URL}/core/get-csrf-token/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Token from response:', data.csrfToken);
        
        // Get token from cookie
        const cookieToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];

        console.log('Token from cookie:', cookieToken);
        
        if (!cookieToken) {
            throw new Error('CSRF token not found in cookies');
        }
        
        return data.csrfToken; // Use token from response instead of cookie
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
}

export async function getClaudeResponse(userPrompt) {
    try {
        const csrftoken = await fetchCsrfToken();
        console.log('Using CSRF token for Claude request:', csrftoken);
        console.log('Current cookies:', document.cookie);

        const response = await fetch(`${VITE_API_BASE_URL}/core/get-claude-response/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ userPrompt })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response not OK:', response.status, errorText);
            console.error('Request headers:', Object.fromEntries([...response.headers]));
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching Claude response:', error);
        return "Sorry, there seems to be a veggie jam in my Ninja. Please try again later.";
    }
}