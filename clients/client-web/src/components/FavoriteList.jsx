

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findRecipeById } from '../service/recipeApi'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Paper, Typography, List, ListItem, ListItemText, Box, Grid, Divider } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShowRecipe from './views/ShowRecipe';



const FavoriteList = () => {
    // return (
    //     <div>
    //         <h2>Favorite Recipes</h2>
    //         <ul>
    //             {ShowRecipe.favoriteRecipes.map((favoriteRecipe) => (
    //                 <li key={favoriteRecipe.id}>{favoriteRecipe.title}</li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default FavoriteList;