import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'

const EMPTY_INGREDIENT = {
    id: 0,
    name: '',
    aisle: '',
    imageUrl: ''
}

const Ingredient = ({ ing }) => {
    const [ingredient, setIngredient] = useState(EMPTY_INGREDIENT);
    
    useEffect(() => {
        setIngredient(ing);
    }, []);

    console.log(ing);
   
    return (
        <FormControlLabel 
            label={ingredient.name}
            labelPlacement='end'
            control={<Checkbox />}
        />
    )
}

export default Ingredient