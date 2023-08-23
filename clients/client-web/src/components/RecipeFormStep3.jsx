import { Fragment, useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'
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
            <Typography variant='h4' p={2}>{header}</Typography>
            <Paper elevation={2} sx={{ 
    overflow: 'auto',
    maxHeight: '48vh',
    width: '100%'}}>
                {recipeIngredients.length > 0 && recipeIngredients.map((i,idx) => 
                    <RecipeIngredient 
                    key={idx} ingredient={i} 
                    onChange={onRecipeIngredientChange} 
                    units={units} 
                    />
                )}
            </Paper>
        </Fragment>
    )
}

export default RecipeFormStep3