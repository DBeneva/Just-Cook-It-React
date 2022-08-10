const baseUrl = 'http://localhost:3030';

export const register = async (username, email, password) => {
    const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const jsonResult = await response.json();
    console.log('response', response);
    console.log('jsonresult', jsonResult);

    if (response.ok) {
        return jsonResult;
    }

    throw jsonResult.message;
};

export const login = async (username, password) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const jsonResult = await response.json();

    if (response.ok) {
        return jsonResult;
    }

    throw jsonResult.message;
};

export const logout = (token) => {
    return fetch(`${baseUrl}/users/logout`, {
        headers: {
            'X-Authorization': token
        }
    });
};