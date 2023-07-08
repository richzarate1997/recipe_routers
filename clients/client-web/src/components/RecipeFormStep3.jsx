import { Fragment, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import RecipeIngredient from './RecipeIngredient'
import { findAllUnits } from '../service/recipeApi';

const RecipeFormStep3 = ({ header, recipeIngredients, onRecipeIngredientChange }) => {
    const [units, setUnits] = useState([]);

    useEffect(() => {
        findAllUnits()
            .then(data => setUnits(data));
    }, []);
    
    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            <Fragment>
                {recipeIngredients.length > 0 && recipeIngredients.map((i) => 
                    <RecipeIngredient 
                    key={i.ingredient.id} ingredient={i} 
                    onChange={onRecipeIngredientChange} 
                    units={units} 
                    />
                )}
            </Fragment>
        </Fragment>
    )
}

export default RecipeFormStep3