import React from 'react'

const RecipeIngredient = ({ing}) => {
    return (
        <li>{ing.quantity} {ing.unit.abbreviation} {ing.ingredient.name}</li>
    )
}

export default RecipeIngredient