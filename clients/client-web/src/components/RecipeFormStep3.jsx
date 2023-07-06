import { Fragment, useContext, useEffect, useState } from 'react'
import {
    Typography
} from '@mui/material'
import RecipeContext from '../contexts/RecipeContext'
import RecipeIngredient from './RecipeIngredient'

const RecipeFormStep3 = ({ header, onRecipeIngredientChange, onRecipeIngredientAdd }) => {
    const [ingredients, setIngredients] = useState([]);
    const obj = useContext(RecipeContext);

    useEffect(() => {
        setIngredients(obj.ingredients)
    }, []);
    
    
    const handleRecipeIngredient = (recipeIngredient) => {
        onRecipeIngredientChange(recipeIngredient);
    }
    
    const addRecipeIngredient = (recipeIngredient) => {
        onRecipeIngredientAdd(recipeIngredient)
    }
    
    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            <Fragment>
                {ingredients.length > 0 && ingredients.map((i) =>
                    <RecipeIngredient key={i.name} ingredient={i} onChange={handleRecipeIngredient} onCreateRecipeIngredient={addRecipeIngredient}/>
                )}
            </Fragment>
        </Fragment>
    )
}

export default RecipeFormStep3