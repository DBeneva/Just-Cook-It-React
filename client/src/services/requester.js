export const request = async (method, url, data) => {
    const response = await fetch(url, {
        method,
        headers: {
            'content-type': 'application/json',
            'X-Authorization': getToken()
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json();

    if (response.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

function getToken() {
    try {
        const userItem = localStorage.getItem('user');
        return JSON.parse(userItem).token;
    } catch (err) {
        console.error(err);
    }
}

export const get = request.bind(null, 'GET');
export const put = request.bind(null, 'PUT');
export const post = request.bind(null, 'POST');
export const remove = request.bind(null, 'DELETE');