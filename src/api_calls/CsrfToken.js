const VITE_API_BASE_URL = import.meta.env.PROD
    ? 'https://oh-kale-no-backend.onrender.com'
    : 'http://localhost:8000';

let csrfToken = null;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function fetchCsrfToken() {
    if (!csrfToken) {
        csrfToken = getCookie('csrftoken');
        if (!csrfToken) {
            throw new Error('CSRF token not found in cookies.');
        }
    }
    return csrfToken;
}

export default fetchCsrfToken;


// export async function fetchCsrfToken() {
//     if (csrfToken) {
//         return csrfToken;
//     }
//     try {
//         console.log('Fetching CSRF token...');
//         const response = await fetch(`${VITE_API_BASE_URL}/core/get-csrf-token/`, {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Accept': 'application/json',
//                 'X-Requested-With': 'XMLHttpRequest',
//             }
//         });
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         csrfToken = data.csrfToken;

//         console.log('csrfToken returned from fetchCsrfToken:', csrfToken);
        
//         if (!csrfToken) {
//             throw new Error('CSRF token not found in response.');
//         }
        
//         return csrfToken; 
//     } catch (error) {
//         console.error('Error fetching CSRF token: ', error);
//         throw error;
//     }
// }

// export default fetchCsrfToken;