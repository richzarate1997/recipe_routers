import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ingredient';

export async function findAllIngredients() {
    try {
        const response = await axios.get(API_URL);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function findIngredientById(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject('Ingredient: ${id} was not found. ');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function findIngredientByName(name) {
    try {
        const response = await axios.get(`${API_URL}/search/?name=${encodeURIComponent(name)}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(`Ingredient: ${name} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function createIngredient(ingredient) {
    try {
        const init = makeIngredientInit('POST', ingredient);
        const response = await axios.post(API_URL, ingredient, init);

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


function makeIngredientInit(method, ingredient) {
    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(ingredient)
    };

    return init;
}