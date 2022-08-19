import * as request from './requester';

const baseUrl = 'http://localhost:3030';

export const loadRecipes = async () => {
    return await request.get(`${baseUrl}/recipes`);
};

export const loadRecipe = async (recipeId) => {
    return await request.get(`${baseUrl}/recipes/${recipeId}`);
};

export const loadMyRecipes = async () => {
    return await request.get(`${baseUrl}/recipes/my-recipes`);
};

export const loadMyFavorites = async () => {
    return await request.get(`${baseUrl}/recipes/my-favorites`);
};

export const saveRecipe = async (data) => {
    return await request.post(`${baseUrl}/recipes`, data);
};

export const updateRecipe = async (data) => {
    return await request.put(`${baseUrl}/recipes/${data._id}`, data);
};

export const deleteRecipe = async (recipeId) => {
    return await request.remove(`${baseUrl}/recipes/${recipeId}`);
};

export const likeRecipe = async (recipeId) => {
    return await request.put(`${baseUrl}/recipes/${recipeId}/like`);
};

export const unlikeRecipe = async (recipeId) => {
    return await request.put(`${baseUrl}/recipes/${recipeId}/unlike`);
};