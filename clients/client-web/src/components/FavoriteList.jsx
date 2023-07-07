import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findRecipeById } from '../../service/recipeApi'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Paper, Typography, List, ListItem, ListItemText, Box, Grid, Divider } from '@mui/material';
import RecipeIngredient from '../RecipeIngredient';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


