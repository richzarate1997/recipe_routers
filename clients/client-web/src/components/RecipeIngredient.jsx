import React, { useEffect, useState } from 'react'

const EMPTY_INGREDIENT = {
    id: 0,
    name: '',
    aisle: '',
    imageUrl: ''
}

const RecipeIngredient = ({ing}) => {
    const [ingredient, setIngredient] = useState(EMPTY_INGREDIENT);
    useEffect(() => {
        setIngredient(ing);
    }, [ing]);
    return (
        <li>{ing.quantity} {ing.unit.abbreviation} {ing.ingredient.name}</li>
    )
}

export default RecipeIngredient