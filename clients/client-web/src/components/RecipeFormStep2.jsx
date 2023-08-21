import { Fragment, useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material';
import IngredientList from './IngredientList';
import { findAllIngredients } from '../service/ingredientApi';



const RecipeFormStep2 = ({ header, recipe, handleIngredientsChanged, handleOpen, open}) => {
    const [allIngredients, setAllIngredients] = useState([]);

    useEffect(() => {
        findAllIngredients().then(data => setAllIngredients(data));
    }, [open])

    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            <Fragment>
                <IngredientList allIngredients={allIngredients} recipeIngredients={recipe.ingredients} handleIngredientsChanged={handleIngredientsChanged}/>
                <Button onClick={handleOpen} color='secondary' variant='contained' sx={{ marginTop: 3}}>
                    Missing an ingredient?
                </Button>
            </Fragment>
        </Fragment>
    );
};

export default RecipeFormStep2