import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ingredient';

export async function findAllIngredients() {
  const response = await axios.get(API_URL);
  if (response.status === 200) {
    return response.data;
  }
}

export async function findIngredientById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(`Ingredient: ${id} was not found.`);
  }
}

export async function findIngredientByName(name) {
  const response = await axios.get(`${API_URL}/search/${encodeURIComponent(name)}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(`Ingredient: ${name} was not found.`);
  }

}

export async function createIngredient(ingredient) {
  const init = makeIngredientInit();
  const response = await axios.post(API_URL, ingredient, init);
  if (response.status === 201) {
    return response.data;
  } else {
    const errors = await response.json();
    return Promise.reject(errors);
  }
}


function makeIngredientInit() {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  };
}
