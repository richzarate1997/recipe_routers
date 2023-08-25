import { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import RecipeIngredient from './RecipeIngredient'
import { findAllUnits } from '../../../service/recipeApi';

const RecipeFormStep3 = ({ header, recipeIngredients, onRecipeIngredientChange, fullScreen, onRecipeIngredientFlux }) => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    findAllUnits()
      .then(data => setUnits(data));
  }, []);

  return (
    <>
      <Typography variant='h4' p={2}>{header}</Typography>
      <Paper elevation={2} sx={{
        overflow: 'auto',
        maxHeight: '48vh',
        width: fullScreen ? '110%' : '100%'
      }}>
        { recipeIngredients?.map((i, idx) =>
          <RecipeIngredient
            key={idx} index={idx} recipeIngredient={i}
            onChange={onRecipeIngredientChange}
            units={units}
            recipeIngredients={recipeIngredients}
            onRecipeIngredientFlux={onRecipeIngredientFlux}
          />
        )}
      </Paper>
    </>
  )
}

export default RecipeFormStep3