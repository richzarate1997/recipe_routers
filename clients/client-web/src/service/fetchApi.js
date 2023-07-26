import axios from "axios";

export async function getRandomJoke() {

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.text);
        return response.data.text;
    } catch (error) {
        console.error(error);
    }
}

export async function getRandomTrivia() {
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.text);
        return response.data.text;
    } catch (error) {
        console.error(error);
    }
}

export async function searchRecipes(query) {
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        params: {
            query: `${query}`,
            instructionsRequired: true,
            fillIngredients: true,
            addRecipeInformation: true,
            number: '10',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}