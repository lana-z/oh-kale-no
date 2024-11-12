const API_BASE_URL = import.meta.env.PROD
    ? 'https://ohkaleno.netlify.app/'
    : 'http://localhost:8000';


async function fetchCsrfToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/core/get-csrf-token/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // parse as JSON
        return data.csrftoken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
}

export async function getClaudeResponse(userPrompt) {
    try {
        const csrftoken = await fetchCsrfToken();
        if (!csrftoken) {
            throw new Error('CSRF token is null or undefined');
        }
        console.log('CSRF token: ', csrftoken);

        const response = await fetch(`${API_BASE_URL}/core/get-claude-response/`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  // Add the CSRF token to the headers
            },
            body: JSON.stringify({ userPrompt }),  // Convert to JSON string
        });

        // Parse the JSON response
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching Claude response:', error);
        return "Sorry, there seems to be a veggie jam in my Ninja. Please try again later. I'll be back agreen smoothie in no thyme.";
    }
}
