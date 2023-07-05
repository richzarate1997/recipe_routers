import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findRecipeById } from '../../service/recipeApi';
import { Paper, Typography } from '@mui/material';
import RecipeIngredient from '../RecipeIngredient';

const EMPTY_RECIPE = {
    id: 0,
    userId: 0,
    title: 0,
    instructions: "",
    servings: "",
    cookMinutes: 0,
    imageUrl: "",
    sourceUrl: "",
    image: null,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    ingredients: [],
    cuisines: []
}


const ShowRecipe = () => {
    const [recipe, setRecipe] = useState(EMPTY_RECIPE);
    const [image, setImage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const styles = {
        paper: {
            textAlign: 'center',
            width: '50vw',
            margin: '5vh auto',
            height: '78vh',
            borderRadius: '25px'
        }
    }

    const imageUrl = "https://spoonacular.com/recipeImages/";

    const renderBlob = () => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
            reader.onerror = (e) => {
                console.log("error: ", e.target.error);
                reject(e.target.error);
            }
            reader.readAsDataURL(recipe.image);
        })
    }

    const renderImage = () => {
        console.log(recipe.image)
        if (recipe.image !== null) {
            renderBlob()
                .then((blob) => setImage(blob))
                .catch(() => setImage(`https://spoonacular.com/recipeImages/Beef-orzo-skillet-667384.jpg`))
            setImage();
        } else {
            setImage(`${imageUrl}${recipe.imageUrl}`);
        }
    }

    useEffect(() => {
        findRecipeById(id)
            .then(data => {
                setRecipe(data)
                console.log(data.ingredients[0].ingredient.name)
                renderImage();
            })
            .catch(err => {
                console.log(err)
                navigate("/notfound", {
                    state: {
                        msg: `Recipe ${id} not found. 🤷`
                    }
                })
            })
    }, []);
    // Unloading the object with line break elements temporarily
    return (
        <Paper elevation={4} style={styles.paper}>
            <Typography variant='h3'>{recipe.title}</Typography>
            {recipe.cookMinutes} Minute Cook Time<br />
            Serves {recipe.servings}<br />
            <img src={image} alt={recipe.title} /><br />
            Instructions: {recipe.instructions}<br />
            {recipe.vegetarian && 'Vegetarian'}
            {recipe.vegan && 'Vegan'}
            {recipe.glutenFree && 'Gluten Free'}
            {recipe.dairyFree && 'Dairy Free'}
            {recipe.sourceUrl && <Typography><a href={recipe.sourceUrl}>Source</a></Typography>}<br />
            Cuisines: {recipe.cuisines.length ? recipe.cuisines.map((c, i) => `${c.name}${recipe.cuisines.length - 1 > i ? ', ' : ''}`) : 'None'}<br />
            Ingredients: <ul>{recipe.ingredients.map((ing, i) => {
                <RecipeIngredient key={i} ing={ing} />
            })}
            </ul>
        </Paper>
    )
}

export default ShowRecipe