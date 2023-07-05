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

    console.log(query);
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
        params: {
            query: `${query}`,
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


// =====~~~~ Spoonacular Recipe object relevant properties~~~~===========
// cookingMinutes: 10
// cuisines: []
// dairyFree: true
// extendedIngredients: (9)[{… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }]
// ^^^0: {
//     aisle: "Pasta and Rice"
//     amount: 0.5
//     id: 18079
//     image: "breadcrumbs.jpg"
//     name: "breadcrumbs"
//     nameClean: "breadcrumbs"
//     unit: "cup"
// }
// glutenFree: false
// id: 479101
// image: "https://spoonacular.com/recipeImages/479101-556x370.jpg"
// instructions: "Cut the florets off the stems and and then chop them into tiny florets. You can also chop up the stems into tiny pieces if you want. You should have about 6 cups of chopped cauliflower. In a large skillet heat 2 tablespoons of olive oil over medium-high heat. Add the cauliflower, 1 teaspoon of salt, rosemary, and sumac. Sauté until cauliflower is tender and starts to brown a bit, stirring as necessary, about 15 minutes. You can also add a bit of olive oil if the pan starts to get too dry or the cauliflower is starting to stick. Meanwhile, in a small skillet, toast the pinenuts over medium heat until golden brown. Set aside. Heat the remaining 2 tablespoons of olive oil in the same pan. Once oil is shimmering, toss in the breadcrumbs and stir, toasting the breadcrumbs. Season with a pinch of kosher salt and a few turns of freshly ground black pepper. Remove from the heat and toss in half of the chopped parsley. When cauliflower is done, remove from the heat and season to taste with freshly ground black pepper and a pinch or so of salt if necessary. Toss in the toasted pine nuts, the chopped raisins, and the remaining parsley. When ready to serve, sprinkle the top with the toasted breadcrumbs and some pecorino."
// readyInMinutes: 20
// servings: 4
// sourceUrl: "http://feedmephoebe.com/2013/11/job-food52s-pan-roasted-cauliflower/"
// title: "On the Jo: an Roasted Cauliflower From Food52"
// vegan: true
// vegetarian: true


export async function getRecipeInformation(id) {
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}