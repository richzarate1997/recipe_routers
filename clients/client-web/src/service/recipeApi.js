
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://localhost:8080/api/recipe';

export async function findAllRecipes() {
    try {
        const response = await axios.get(API_URL);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function findAllCuisines() {
    try {
        const response = await axios.get('http://localhost:8080/api/cuisine');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function findAllUnits() {
    try {
        const response = await axios.get('http://localhost:8080/api/unit');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function findRecipeById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.status === 200) {
        return response.data;
    } else {
        return Promise.reject(`Recipe: ${id} was not found. `);
    }
}

export async function findRecipeByTitle(title) {
    try {
        const response = await axios.get(`${API_URL}/search/${encodeURIComponent(title)}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(`Recipe: ${title} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}


export async function createRecipe(recipe) {
    const jwtToken = localStorage.getItem('jwt_token');
    const { app_user_id } = jwtDecode(jwtToken);
    const userRecipe = { ...recipe, userId: app_user_id };
    const init = makeRecipeInit('POST', jwtToken);
    const response = await axios.post(API_URL, userRecipe, init);
    if (response.status === 201) {
        return response.data;
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    } else if (response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    } else {
        const errors = await response.json();
        return Promise.reject(errors);
    }
}

export async function updateRecipe(recipe) {
    const jwtToken = localStorage.getItem('jwt_token');
    try {
        const init = makeRecipeInit('PUT', jwtToken);
        const response = await axios.put(`${API_URL}/${recipe.id}`, recipe, init);
        if (response.status === 400) {
            return Promise.reject(response.data);
        } else if (response.status === 409) {
            return Promise.reject('Oopsie');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }

}

function makeRecipeInit(method, token) {
    return {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
}

export async function deleteRecipeById(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);

        if (response.status === 400) {
            return Promise.reject(`Recipe: ${id} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}


