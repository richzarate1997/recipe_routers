import axios from 'axios';
import jwtDecode from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:8080';

const API_URL = `${BASE_URL}/api/user`;

export async function findUser() {
    const jwtToken = localStorage.getItem('jwt_token');

    const { app_user_id } = jwtDecode(jwtToken)
    const options = makeOptions('GET', jwtToken)
    const response = await axios.get(`${API_URL}/${app_user_id}`, options);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    } else {
        return Promise.reject(`User: ${app_user_id} was not found.`);
    }
}

export async function update(userProps) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('PUT', jwtToken)
    const response = await axios.put(`${API_URL}`, userProps, options);
    if (response.status === 404) {
        return Promise.reject(`User: ${userProps.id} was not found.`);
    } else if (response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    } else if (response.status === 409) {
        return Promise.reject('Whoops');
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    }
}

export async function addFavorite(fave) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('POST', jwtToken);
    const { app_user_id } = jwtDecode(jwtToken);
    const newFave = { ...fave, userId: app_user_id };
    const response = await axios.post(`${API_URL}/favorite`, newFave, options);
    if (response.status === 201) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    } else {
        const errors = await response.json();
        return Promise.reject(errors);
    }
}

export async function removeFavorite(fave) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('DELETE', jwtToken);
    const { app_user_id } = jwtDecode(jwtToken);
    const byeFave = { ...fave, userId: app_user_id };
    const response = await axios.delete(`${API_URL}/favorite`, byeFave, options);
    if (response.status === 404) {
        return Promise.reject(`Favorite was not found.`);
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    }
}

export async function findAllGroceryListsByUser() {
    const jwtToken = localStorage.getItem('jwt_token');
    const { app_user_id: id } = jwtDecode(jwtToken)
    const options = makeOptions('GET', jwtToken)
    try {
        const response = await axios.get(`${API_URL}/list`, options);
        if (response.status === 200) {
            return response.data.filter((gl) => gl.userId === id);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function findGroceryListById(id) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('GET', jwtToken)
    try {
        const response = await axios.get(`${API_URL}/list/${id}`, options);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(`GroceryList: ${id} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error.response.data);
    }
}

export async function findGroceryListByName(name) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('GET', jwtToken)
    try {
        const response = await axios.get(`${API_URL}/list/search/${name}`, options);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(`GroceryList: ${name} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function createList(groceryList) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('POST', jwtToken);
    const response = await axios.post(`${API_URL}/list`, groceryList, options);
    if (response.status === 201) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    } else {
        const errors = await response.json();
        return Promise.reject(errors);
    }
}

export async function updateList(groceryList) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('PUT', jwtToken);
    const response = await axios.put(`${API_URL}/list`, groceryList, options);
    if (response.status === 404) {
        return Promise.reject(`Grocery list: ${groceryList.id} was not found.`);
    } else if (response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    } else if (response.status === 409) {
        return Promise.reject('Whoops');
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    }
}

export async function deleteList(groceryList) {
    const jwtToken = localStorage.getItem('jwt_token');
    const options = makeOptions('DELETE', jwtToken);
    const response = await axios.delete(`${API_URL}/list`, groceryList, options);
    if (response.status === 404) {
        return Promise.reject(`Grocery list: ${groceryList.id} was not found.`);
    } else if (response.status === 403) {
        return Promise.reject('Unauthorized');
    }
}

const makeOptions = (method, token) => {
    return {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };
}