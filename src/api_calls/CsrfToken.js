const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

let csrfToken = null;

export async function fetchCsrfToken() {
    if (csrfToken) {
        console.log('CSRF token already cached:', csrfToken);
        return csrfToken;
    }
    try {
        console.log('Fetching CSRF token.');
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
        
        csrfToken = getCookie('csrftoken');
        console.log('CSRF token retrieved from cookies:', csrfToken);

        if (!csrfToken) {
            throw new Error('CSRF token not found in response.');
        }
        
        return csrfToken; 
    } catch (error) {
        console.error('Error fetching CSRF token: ', error);
        throw error;
    }
}

export default fetchCsrfToken;


function getCookie(name) {
    console.log('Document cookies:', document.cookie);
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
