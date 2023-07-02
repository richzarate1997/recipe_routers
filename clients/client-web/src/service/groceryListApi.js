import axios from 'axios';

const API_URL = 'http://localhost:8080/api/groceryList';

export async function findAllGroceryLists() {
    try {
        const response = await axios.get(API_URL);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function findGroceryListById(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject('GroceryList: ${id} was not found. ');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function createGroceryList(groceryList) {
    try {
        const init = makeGroceryListInit('POST', groceryList);
        const response = await axios.post(API_URL, groceryList, init);

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

export async function updateGroceryList(groceryList) {
    try {
        const init = makeGroceryListInit('PUT', groceryList);
        const response = await axios.post(`${API_URL}/${groceryList.id}`, groceryList, init);

        if (response.status === 400) {
            return Promise.reject('GroceryList: ${id} was not found. ');
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

function makeGroceryListInit(method, groceryList) {
    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(groceryList)
    };

    return init;
}

export async function deleteGroceryListById(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);

        if (response.status === 400) {
            return Promise.reject('GroceryList: ${id} was not found. ');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}