import { Fragment, useState, useEffect } from 'react'
import { Typography, Button, Tooltip } from '@mui/material';
import IngredientList from './IngredientList';
import { findAllIngredients } from '../service/ingredientApi';



const RecipeFormStep2 = ({ header, recipe, handleIngredientsChanged, handleOpen, open }) => {
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    findAllIngredients().then(data => setAllIngredients(data));
  }, [open])

  return (
    <Fragment>
      <Typography variant='h4' p={2}>{header}</Typography>
      <Fragment>
        <IngredientList allIngredients={allIngredients} recipe={recipe} handleIngredientsChanged={handleIngredientsChanged} />
        <Tooltip arrow title='Add a New One!'>
          <Button onClick={handleOpen} color='secondary' variant='contained' sx={{ marginTop: 3 }}>
            Can't find an ingredient?
          </Button>
        </Tooltip>
      </Fragment>
    </Fragment>
  );
};

export default RecipeFormStep2