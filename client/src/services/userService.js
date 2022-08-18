import * as request from './requester';

const baseUrl = 'http://localhost:3030';

export const editAccount = async (data, userId) => {
    return await request.put(`${baseUrl}/users/${userId}`, data);
};

export const deleteAccount = async (userId) => {
    return await request.remove(`${baseUrl}/users/${userId}`);
};

export const changePassword = async (data, userId) => {
    return await request.put(`${baseUrl}/users/${userId}/change-password`, data);
};