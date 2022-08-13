const baseUrl = 'http://localhost:3030';

export const editAccount = async (username, email, user) => {
    const response = await fetch(`${baseUrl}/users/${user._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.token
        },
        body: JSON.stringify({ username, email })
    });

    const jsonResult = await response.json();

    if (response.ok) {
        return jsonResult;
    } else {
        throw jsonResult;
    }
};

export const deleteAccount = async (user) => {
    const response = await fetch(`${baseUrl}/users/${user._id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.token
        }
    });

    const jsonResult = await response.json();

    if (response.ok) {
        return jsonResult;
    } else {
        throw jsonResult;
    }
};