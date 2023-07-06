import React, { useContext, useEffect, useState } from 'react'
import { Grid, TextField, Select, MenuItem, Typography, OutlinedInput } from '@mui/material';
import { findAllUnits } from '../service/recipeApi'
import RecipeContext from '../contexts/RecipeContext';

const EMPTY_RECIPE_INGREDIENT = {
quantity: 0,
ingredient: {},
unit: {}
}

const RecipeIngredient = ({ ingredient, onCreateRecipeIngredient, onChange }) => {
    const [recipeIngredient, setRecipeIngredient] = useState(EMPTY_RECIPE_INGREDIENT);
    const [allUnits, setAllUnits] = useState([]);

    useEffect(() => {
        setRecipeIngredient({ ...recipeIngredient, ingredient })
        findAllUnits()
            .then(data => setAllUnits(data))
            .catch(err => console.log(err));
        onCreateRecipeIngredient({ ...recipeIngredient, ingredient });
    }, []);
    
    const handleChange = (e) => {
        const nextRecipeIngredient = { ...recipeIngredient };
        let nextValue = e.target.value;
        if (e.target.type === 'number') {
            nextRecipeIngredient[e.target.name] = parseFloat(nextValue, 10);
        } else {
            nextRecipeIngredient[e.target.name] = allUnits.find(u => u.id === nextValue);
        }
        setRecipeIngredient(nextRecipeIngredient);
        console.log(recipeIngredient)
        onChange(recipeIngredient)
    }

    return (
        <Grid container sx={{ width: '40%' }} spacing={2}>
            <Grid item xs={2} sm={3}>
                <TextField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    size='small'
                    minRows={0.0001}
                    required
                    value={recipeIngredient.quantity}
                    onChange={handleChange}
                    sx={{ width: '5rem' }}
                />
            </Grid>
            <Grid item xs={2} sm={3}>
                <Select
                    displayEmpty
                    name="unit"
                    size="small"
                    width='20%'
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ width: '5rem' }}
                >
                    <MenuItem value=''>
                        <em>Select Unit</em>
                    </MenuItem>
                    { allUnits.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                            {unit.abbreviation}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={3} sm={3} md={5}>
                <Typography variant="body1" p={1} textAlign={'left'}>{ingredient.name}</Typography>
            </Grid>
        </Grid>
    )
}

export default RecipeIngredient