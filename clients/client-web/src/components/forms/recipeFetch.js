
function fetchRecipe(id, name, cookTime, servings) {
    findRecipeByTitle(name)
        .then(data => {
            // if data returns an array with 1 item matching, return it
            if (data.some((r) => r.name === name && r.cookTime === cookTime && r.servings === servings)) {
                const recipe = data.find((r) => r.name === name && r.cookTime === cookTime && r.servings === servings)
                navigate(recipe.id);
            } else { // else if data doesn't match, then add the recipe
                getRecipeInformation(id)
                    .then(async (data) => {
                        console.log(data)
                        return await createRecipe(unpackRecipe(data))
                            .then((data) => navigate(data.id))
                            .catch((err) => console.log("There was an error creating the recipe: ", err));
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