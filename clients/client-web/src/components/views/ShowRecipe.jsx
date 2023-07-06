import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findRecipeById } from '../../service/recipeApi';
import { Paper, Typography, List, ListItem, ListItemText, Box, Grid, Divider } from '@mui/material';
import RecipeIngredient from '../RecipeIngredient';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

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
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const styles = {
        paper: {
            textAlign: 'center',
            width: '50vw',
            margin: '5vh auto',
            borderRadius: '25px'
        }
    }

    const renderBlob = () => {
        // const reader = new FileReader();
        // return new Promise((resolve, reject) => {
        //     reader.onloadend = () => {
        //         const base64data = reader.result;
        //         resolve(base64data);
        //     };
        //     reader.onerror = (e) => {
        //         console.log("error: ", e.target.error);
        //         reject(e.target.error);
        //     }
        //     reader.readAsDataURL(recipe.image);
        // })
        return atob(image)
    }

    const renderImage = () => {

    }

    useEffect(() => {
        findRecipeById(id)
            .then(data => {
                setRecipe(data)
                setIngredients(data.ingredients);
                setImage(data.imageUrl)
                // !data.image ? atob(data.image) : 
            })
            .catch(() => navigate("/notfound", {
                state: {
                    msg: `Recipe ${id} not found. 🤷`
                }
            })
            )
    }, []);
    // Unloading the object with line break elements temporarily
    return (
        <>
            {
                ingredients.length > 0 &&
                <Paper elevation={4} style={styles.paper}>
                    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item pt={2}>
                            <Typography variant='h3'>{recipe.title}</Typography>
                            <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
                            <Box component='img' src={`${image}`} alt={recipe.title} width={200} />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            <AccessTimeOutlinedIcon />
                            <Typography>{recipe.cookMinutes} Minutes </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <MenuBookOutlinedIcon />
                            <Typography>{recipe.servings} Servings</Typography>
                        </Grid>
                    </Grid>
                    <Typography>
                        {recipe.vegetarian && 'Vegetarian'}
                    </Typography>
                    <Typography>
                        {recipe.vegan && 'Vegan'}
                    </Typography>
                    <Typography>
                        {recipe.glutenFree && 'Gluten Free'}
                    </Typography>
                    <Typography>
                        {recipe.dairyFree && 'Dairy Free'}
                    </Typography>



                    
                    <Typography>
                        {recipe.cuisines.length ? recipe.cuisines.map((c, i) => `${c.name}${recipe.cuisines.length - 1 > i ? ', ' : ''}`) : 'None'}<br />
                    </Typography>
                    <Typography>
                       
                    </Typography>
                    <List>
                        <ListItem>

                        </ListItem>
                        {ingredients.map(ingredient => (
                            <ListItem key={ingredient.ingredient.id}>
                                <ListItemText primary={`${ingredient.quantity} ${ingredient.unit.name} ${ingredient.ingredient.name}`} />
                            </ListItem>
                        ))}
                    </List>

                    <Typography>
                        Instructions:
                    </Typography>
                    <Typography>
                        {recipe.instructions}<br />
                    </Typography>

                    {recipe.sourceUrl && <Typography><a href={recipe.sourceUrl}>Source</a></Typography>}
                </Paper>
            }
        </>
    )
}

export default ShowRecipe