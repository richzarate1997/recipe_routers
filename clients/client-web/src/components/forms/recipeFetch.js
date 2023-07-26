findAllCuisines()
    .then((c) => setCuisines(c))
    .catch(err => console.log("There was an error retrieving cuisines."));
findAllUnits()
    .then((u) => setUnits(u))
    .catch(err => console.log("There was an error retrieving units."));
findAllIngredients()
    .then((i) => setIngredients(i))
    .catch(err => console.log("There was an error retrieving ingredients."))


export function fetchRecipe({ name, cookTime, servings }) {
    findRecipeByTitle(name)
        .then(data => {
            // if data returns an array with 1 item matching, return it
            if (recipes.some((r) => r.name === name && r.cookTime === cookTime && r.servings === servings)) {
                const recipe = recipes.find((r) => r.name === name && r.cookTime === cookTime && r.servings === servings)
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
        .catch(err => console.log("There was an error searching recipe by name: ", err));
}

function unpackRecipe(data) {
    return {
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
        cuisines: unpackCuisines(data.cuisines),
        ingredients: unpackIngredients(data.extendedIngredients)
    }
}

function unpackCuisines(theseCuisines) {
    return cuisines.filter((c1) => theseCuisines.some(c2 => c2 === c1.name))
}

function unpackIngredients(theseIngredients) {
    return theseIngredients.forEach((i) => {
        // check if the ingredient found in db collection
        // and return that, otherwise add it to db
        return {
            id: 0,
            recipeId: 0,
            quantity: i.amount,
            unit: units.find(u => u.name === i.unit || u.abbrev === i.unit),
            ingredient: matchOrAddIngredient(i)
        }
    })
}

async function matchOrAddIngredient(ingredient) {
    let matchedIngredient = ingredients.find((i) => i.name === ingredient.name);
    if (matchedIngredient === undefined) {
        let newIngredient = {
            id: 0,
            name: ingredient.name,
            aisle: ingredient.aisle,
            imageUrl: ingredient.image
        }
        return await createIngredient(newIngredient).then(data => data);
    } else {
        return matchedIngredient;
    }
}