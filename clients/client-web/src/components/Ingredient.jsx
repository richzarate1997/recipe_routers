import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'

const Ingredient = ({ ing }) => {
    const [ingredient, setIngredient] = useState({});
    
    useEffect(() => {
        setIngredient(ing);
        console.log(ingredient)
    }, [ing])
    
    return (
        <FormControlLabel 
            label={ingredient.name}
            labelPlacement='right'
            control={<Checkbox />}
        />
    )
}

export default Ingredient