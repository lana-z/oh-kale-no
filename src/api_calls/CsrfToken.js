const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

let csrfToken = null;

export async function fetchCsrfToken() {
    if (csrfToken) {
        return csrfToken;
    }
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

        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});

        csrfToken = cookies['csrftoken'] || null

        console.log('csrfToken returned from fetchCsrfToken:', csrfToken);
        console.log('document.cookie in fetchCsrfToken: ', document.cookie);
        
        if (!csrfToken) {
            throw new Error('CSRF token not found in cookies.');
        }
        
        return csrfToken; 
    } catch (error) {
        console.error('Error fetching CSRF token: ', error);
        throw error;
    }
}

export default fetchCsrfToken;