findAllCuisines()
    .then((c) => setCuisines(c))
    .catch(err => console.log("There was an error retrieving cuisines."));
findAllUnits()
    .then((u) => setUnits(u))
    .catch(err => console.log("There was an error retrieving units."));

export function fetchRecipe({ name, cookTime, servings }) {
    findRecipeByTitle(name)
        .then(data => {
            // if data returns an array with 1 item matching, return it
            if (data.some((r) => r.name === name && r.cookTime === cookTime && r.servings === servings)) {
                const recipe = data.find((r) => r.name === name)
                return recipe.id;
                // else if data returns an empty array, then add the recipe
            } else {
                getRecipeInformation(id)
                    .then((data) => {
                        return createRecipe(unpackRecipe(data))
                            .then((data) => data.id)
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log("There was an error with spoonacular: ", err));
            }
        })
        .catch(err => console.log(err));
}

function unpackRecipe(data) {
    const newRecipe = {
        id: 0,
        userId: 1,
        title: data.title,
        instructions: data.instructions,
        servings: data.servings,
        cookMinutes: data.readyInMinutes,
        imageUrl: data.image,
        sourceUrl: data.sourceUrl,
        image: null,
        vegetarian: data.vegetarian,
        vegan: data.vegan,
        glutenFree: data.glutenFree,
        dairyFree: data.dairyFree,
        cuisines: [],
        ingredients: []
    }
    unpackCuisines(data.cuisines);
    unpackIngredients(data.extendedIngredients);
    return newRecipe;
}

async function unpackCuisines(cuisines) {
    const theseCuisines = [];
    findAllCuisines()
        .then((c) => theseCuisines.push(c))
        .then(() => theseCuisines.filter((c1) => cuisines.some(c2 => c2 === c1.name)))
        .then(() => newRecipe = { ...newRecipe, cuisines: theseCuisines })
        .catch(err => console.log("There was an error retrieving cuisines."));
}

async function unpackIngredients(ingredients) {
    const theseIngredients = ingredients.forEach((i) => {
        const { name, aisle, amount, unit, image } = i;
        const unit_obj = units.find(u => u.name === unit || u.abbrev === unit);
        return {
            id: 0,
            recipeId: 0,
            quantity: amount,
            unit: unit_obj,
            ingredient: {
                id: 0,
                name: name,
                aisle: aisle,
                imageUrl: image
            }
            
        };
    });
    
}g