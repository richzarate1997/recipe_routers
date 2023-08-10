import axios from "axios";

// Assume 50 points a day for spoonacular requests/responses

export async function getRandomJoke() { // 1 point

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

export async function getRandomTrivia() { // 1 point
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

// export async function searchRecipes(query) { 
//     const options = { // 1 point + .01 point per result
//         method: 'GET',
//         url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
//         params: { // total = 1.35 points per request/response if 10 recipes are returned
//             query: `${query}`,
//             instructionsRequired: true,
//             addRecipeInformation: true, // .025 per recipe returned
//             number: '10', //consider increasing recipe return to ~25 to bump up search request closer to 2 points
//             limitLicense: true
//         },
//         headers: {
//             'X-RapidAPI-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
//             'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//         }
//     };
//     try {
//         const response = await axios.request(options);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }