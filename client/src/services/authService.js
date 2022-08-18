import * as request from './requester';

const baseUrl = 'http://localhost:3030';

export const register = async (data) => {
    return await request.post(`${baseUrl}/auth/register`, data);
};

export const login = async (data) => {
    return await request.post(`${baseUrl}/auth/login`, data);
};

export const logout = async () => {
    return await request.get(`${baseUrl}/auth/logout`);
};