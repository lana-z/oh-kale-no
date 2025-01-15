const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

let csrfToken = null;

export async function fetchCsrfToken() {
    if (csrfToken) {
        console.log('Using cached CSRF token:', csrfToken);
        return csrfToken;
    }
    
    console.log('Fetching CSRF token...');
    try {
        const response = await fetch(`${VITE_API_BASE_URL}/core/get-csrf-token/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
        
        if (!response.ok) {
            console.error('Failed to fetch CSRF token:', response.status, response.statusText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        csrfToken = data.csrfToken;
        
        // Log the token we're using
        console.log('Using CSRF token from response:', csrfToken);

        if (!csrfToken) {
            throw new Error('CSRF token not found in response');
        }

        console.log('Successfully retrieved CSRF token');
        return csrfToken;
    } catch (error) {
        console.error('Error in fetchCsrfToken:', error);
        throw error;
    }
}

export default fetchCsrfToken;
