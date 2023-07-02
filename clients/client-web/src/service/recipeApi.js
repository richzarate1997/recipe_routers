import axios from 'axios';

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
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject('Recipe: ${id} was not found. ');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function findRecipeByTitle(title) {
    try {
        const response = await axios.get(`${API_URL}/search/?name=${encodeURIComponent(title)}`);
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
    try {
        const init = makeRecipeInit('POST', recipe);
        const response = await axios.post(API_URL, recipe, init);

        if (response.status === 201) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function updateRecipe(recipe) {
    try {
        const init = makeRecipeInit('PUT', recipe);
        const response = await axios.post(`${API_URL}/${recipe.id}`, recipe, init);

        if (response.status === 400) {
            return Promise.reject('Recipe: ${id} was not found. ');
        } else if (response.status === 400) {
            return Promise.reject(response.data);
        } else if (response.status === 409) {
            return Promise.reject('Oopsie');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }

}

function makeRecipeInit(method, recipe) {
    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(recipe)
    };

    return init;
}

export async function deleteRecipeById(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);

        if (response.status === 400) {
            return Promise.reject('Recipe: ${id} was not found. ');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}


