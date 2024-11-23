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

        // Try to get token from cookie first
        csrfToken = getCookie('csrftoken');
        
        // Log the token we're using
        console.log('Using CSRF token:', csrfToken);

        if (!csrfToken) {
            throw new Error('CSRF token not found in cookie');
        }

        console.log('Successfully retrieved CSRF token');
        return csrfToken;
    } catch (error) {
        console.error('Error in fetchCsrfToken:', error);
        throw error;
    }
}

function getCookie(name) {
    const cookies = document.cookie;
    console.log('All cookies:', cookies);
    if (!cookies) {
        console.log('No cookies found');
        return null;
    }

    const cookieArray = cookies.split(';').map(c => c.trim());
    console.log('Cookie array:', cookieArray);
    
    for (const cookie of cookieArray) {
        if (cookie.startsWith(name + '=')) {
            const value = cookie.split('=')[1];
            console.log(`Found ${name} cookie with value:`, value);
            return value;
        }
    }

    console.log(`${name} cookie not found in:`, cookieArray);
    return null;
}

export default fetchCsrfToken;
