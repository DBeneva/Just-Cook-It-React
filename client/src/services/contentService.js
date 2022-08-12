import * as request from './requester';

const baseUrl = 'http://localhost:3030';

export const loadRecipes = async () => {
    const recipes = await request.get(`${baseUrl}/recipes`);
    return recipes;
};

export const loadRecipe = async (id) => {
    const response = await fetch(`${baseUrl}/recipes/${id}`);
    const recipe = await response.json();
    console.log(recipe);
    return recipe;
};


export const loadMyRecipes = async (user) => {
    const response = await fetch(`${baseUrl}/recipes/my-recipes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.token
        }
    });
    
    return await response.json();
};

export const loadMyFavorites = async (ownerId) => {
    // const query = encodeURIComponent(`_ownerId="${ownerId}"`);
    return await request.get(`${baseUrl}/recipes/my-favorites`);
};

export const saveRecipe = async (data, user) => {
    const response = await fetch(`${baseUrl}/recipes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.token
        },
        body: JSON.stringify({ ...data, likedBy: [], user })
    });

    return await response.json();
};

export const updateRecipe = async (data) => {
    const response = await fetch(`${baseUrl}/recipes/${data._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': data.user.token
        },
        body: JSON.stringify(data)
    });

    const jsonResult = await response.json();

    if (response.ok) {
        return jsonResult;
    } else {
        throw jsonResult;
    }
};

export const deleteRecipe = async (data) => {
    return fetch(`${baseUrl}/recipes/${data.recipeId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': data.user.token
        }
    }).then(res => res.json());
};

export const likeRecipe = async (data) => {
    return fetch(`${baseUrl}/recipes/${data.recipeId}/like`, {
        method: 'PUT',
        body: data.user,
        headers: {
            'X-Authorization': data.user.token
        }
    }).then(res => res.json());
};

export const unlikeRecipe = async (data) => {
    return fetch(`${baseUrl}/recipes/${data.recipeId}/unlike`, {
        method: 'PUT',
        headers: {
            'X-Authorization': data.user.token
        }
    }).then(res => res.json());
};

//   loadMyRecipes(user: IUser) {
//     return this.http.get<IRecipe[]>(`${API_URL}/recipes/my-recipes`, {
//       headers: new HttpHeaders({
//         'x-authorization': user ? user.token : ''
//       })
//     });
//   }

//   loadMyFavorites(user: IUser) {
//     return this.http.get<IRecipe[]>(`${API_URL}/recipes/my-favorites`, {
//       headers: new HttpHeaders({
//         'x-authorization': user ? user.token : ''
//       })
//     });
//   }
  
//   saveRecipe(data: any) {
//     return this.http.post<IRecipe>(`${API_URL}/recipes`, data, {
//       headers: new HttpHeaders({
//         'x-authorization': data.user ? data.user.token : ''
//       })
//     });
//   }

//   updateRecipe(data: any) {
//     return this.http.put<IRecipe>(`${API_URL}/recipes/${data.recipeId}`, data.recipeData, {
//       headers: new HttpHeaders({
//         'x-authorization': data.user ? data.user.token : ''
//       })
//     });
//   }

//   deleteRecipe(data: any) {
//     console.log('deleting in content service', data.recipeId);
//     return this.http.delete<IRecipe>(`${API_URL}/recipes/${data.recipeId}`, {
//       headers: new HttpHeaders({
//         'x-authorization': data.user ? data.user.token : ''
//       })
//     });
//   }

//   likeRecipe(data: any) {
//     return this.http.put<IRecipe>(`${API_URL}/recipes/${data.recipeId}/like`, {}, {
//       headers: new HttpHeaders({
//         'x-authorization': data.user ? data.user.token : ''
//       })
//     });
//   }

//   unlikeRecipe(data: any) {
//     return this.http.put<IRecipe>(`${API_URL}/recipes/${data.recipeId}/unlike`, {}, {
//       headers: new HttpHeaders({
//         'x-authorization': data.user ? data.user.token : ''
//       })
//     });
//   }