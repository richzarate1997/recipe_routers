
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  Alert, Typography, List, ListItem,
  ListItemText, Box, Grid, Divider,
  Paper, Chip, Stack, Checkbox
} from '@mui/material';
import * as DOMPurify from 'dompurify';
import { toFraction } from 'fraction-parser';
import parse from 'html-react-parser';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { renderCooktime } from '../modules/conversions';
import { findRecipeById } from '../../service/recipeApi';
import { addFavorite, removeFavorite, isFavorite } from '../../service/userApi';


const EMPTY_RECIPE = {
  id: 0,
  userId: 0,
  title: 0,
  instructions: "",
  servings: "",
  cookMinutes: 0,
  imageUrl: "",
  sourceUrl: "",
  image: null,
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  ingredients: [],
  cuisines: []
}


const ShowRecipe = ({ userId }) => {
  const [recipe, setRecipe] = useState(EMPTY_RECIPE);
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null);
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
    paper: {
      textAlign: 'center',
      width: '75vw',
      margin: '5vh auto',
      borderRadius: '25px'
    },
    alert: {
      borderRadius: '20px 20px 0 0',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    heading: {
      marginX: '15%',
      display: 'flex',
      alignItems: 'center'
    },
    instr: {
      marginX: '15%',
      textAlign: 'left',
      fontFamily: 'Roboto'
    },
    top: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    list: {
      overflow: 'auto',
      maxHeight: 300,
      width: '50%',
      bgColor: 'primary'
    }
  }


  // const renderBlob = () => {
  //     console.log(recipe.image)
  //     console.log(typeof recipe.image)
  //     const reader = new FileReader();
  //     return new Promise((resolve, reject) => {
  //         reader.onloadend = () => {
  //             const base64data = reader.result;
  //             resolve(base64data);
  //         };
  //         reader.onerror = (e) => {
  //             console.log("error: ", e.target.error);
  //             reject(e.target.error);
  //         }
  //         reader.readAsDataURL(atob(recipe.image));
  //     })
  // }


  const handleFavoriteChange = (e) => {
    e.target.checked ? addFavorite(recipe.id) : removeFavorite(recipe.id);
    setChecked(!checked);
  };

  useEffect(() => {
    findRecipeById(id)
      .then(data => setRecipe(data))
      .catch(() => navigate("/notfound", {
        state: {
          msg: `Recipe ${id} not found. 🤷`
        }
      }))
    if (userId) {
      isFavorite(id)
        .then((data) => setChecked(data))
        .catch((err) => console.log(err))
    }
  }, [id, navigate, userId]);

  useEffect(() => {
    if (recipe.imageUrl !== '') {
      setImage(recipe.imageUrl);
    } else {
      //fixme
      // renderImage();
    }
    setIngredients(recipe.ingredients);
  }, [recipe]);

  const renderIngredientText = (ingredient) => {
    if (ingredient.unit.name === "serving" && ingredient.quantity === recipe.servings) {
      if (ingredient.ingredient.aisle === "Spices and Seasonings") return ingredient.ingredient.name + " to taste"
      return `${ingredient.quantity} serving(s) ${ingredient.ingredient.name} `;
    } else {
      return `${toFraction(ingredient.quantity, true)} ${ingredient.unit.name} ${ingredient.ingredient.name}`
    }
  }

  const renderInstructionText = () => {
    let cleanInstructions = DOMPurify.sanitize(recipe.instructions);
    return parse(cleanInstructions);
  }

  return (
    <>{
      ingredients.length > 0 &&
      <Paper elevation={4} style={styles.paper}>
        {location.state &&
          <Alert severity="success" sx={styles.alert}>
            <Typography variant="subtitle1">
              {location.state.msg}
            </Typography>
          </Alert>
        }

        <Grid container sx={styles.top}>
          <Grid item pt={2}>
            <Typography variant='h3'>{recipe.title}</Typography>
            <Divider sx={{ paddingY: 1 }} />
            <Box component='img' src={image} alt={recipe.title} height='50vh' pt={1} sx={{ borderRadius: '25px 25px' }} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <AccessTimeOutlinedIcon />
            <Typography>{renderCooktime(recipe.cookMinutes)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <PeopleAltIcon />
            <Typography>{recipe.servings} Servings</Typography>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1} py={2} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {recipe.vegetarian && <Chip variant='outlined' size='medium' key={`${recipe.id}-vegetarian`} label='Vegetarian' color='primary' />}
          {recipe.vegan && <Chip variant='outlined' size='medium' key={`${recipe.id}-vegan`} label='Vegan' color='primary' />}
          {recipe.glutenFree && <Chip variant='outlined' size='medium' key={`${recipe.id}-glutenFree`} label='Gluten Free' color='secondary' />}
          {recipe.dairyFree && <Chip variant='outlined' size='medium' key={`${recipe.id}-dairyFree`} label='Dairy Free' color='secondary' />}
          {recipe.cuisines.length ? recipe.cuisines.map((c) => <Chip variant='outlined' size='medium' key={`${recipe.id}-${c.name}`} label={c.name} color='warning' />) : null}
        </Stack>

        <Grid container>
          <Grid item sx={styles.heading}>
            <ListAltIcon />
            <Typography variant='h6'>Ingredients: </Typography>
          </Grid>
        </Grid>

        <Grid item marginX='15%'>
          <List sx={styles.list}>
            {ingredients.map(ingredient => (
              <ListItem key={ingredient.ingredient.id}>
                <ListItemText primary={renderIngredientText(ingredient)} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid container >
          <Grid item sx={styles.heading}>
            <MenuBookOutlinedIcon />
            <Typography px={1} variant='h6'>
              Instructions:
            </Typography>
          </Grid>
          <Grid item sx={styles.instr}>
            {renderInstructionText()}
          </Grid>
        </Grid>

        {userId && userId !== recipe.userId &&
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            sx={{ mt: '5%', '& .MuiSvgIcon-root': { fontSize: 30 } }}
            checked={checked}
            onChange={handleFavoriteChange}
          />
        }

        <Box sx={{ paddingY: '3%' }}>
          {recipe.sourceUrl &&
            <Typography variant='overline'><a href={recipe.sourceUrl}>Source</a></Typography>
          }
        </Box>
      </Paper>
    }
    </>
  )
}

export default ShowRecipe