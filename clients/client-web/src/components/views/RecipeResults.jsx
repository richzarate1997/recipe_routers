import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import Errors from "../Errors";
import RecipeCard from "../RecipeCard";
import { searchRecipes, findAllRecipes } from "../../service/recipeApi";


// const BASE_RECIPES = [
//   {
//     "id": 491786,
//     "image": "Ranch-BLT-Pasta-Salad-491786.jpg",
//     "cookMinutes": 45,
//     "servings": 8,
//     "sourceUrl": "https://www.cinnamonspiceandeverythingnice.com/ranch-blt-pasta-salad/",
//     "title": "Ranch BLT Pasta Salad"
//   },

//   {
//     "id": 492413,
//     "image": "https://spoonacular.com/recipeImages/Chicken-Gnocchi-Soup-(Olive-Garden-Copycat)-492413.jpg",
//     "cookMinutes": 65,
//     "servings": 6,
//     "sourceUrl": "http://www.cinnamonspiceandeverythingnice.com/olive-garden-chicken-and-gnocchi-soup-copycat/",
//     "title": "Chicken Gnocchi Soup (Olive Garden Copycat)"
//   },

//   {
//     "id": 909570,
//     "image": "soy-sauce-noodles-909570.jpg",
//     "cookMinutes": 30,
//     "servings": 2,
//     "sourceUrl": "http://www.loveandoliveoil.com/2015/03/soy-sauce-noodles.html",
//     "title": "Soy Sauce Noodles"
//   },

//   {
//     "id": 667384,
//     "image": "Beef-orzo-skillet-667384.jpg",
//     "cookMinutes": 45,
//     "servings": 4,
//     "sourceUrl": "http://www.sheknows.com/food-and-recipes/articles/1027283/beef-orzo-skillet-recipe",
//     "title": "Beef orzo skillet"
//   },

//   {
//     "id": 709814,
//     "image": "roasted-ratatouille-pasta-709814.jpg",
//     "cookMinutes": 63,
//     "servings": 3,
//     "sourceUrl": "http://thewoksoflife.com/2014/03/ratatouille-pasta/",
//     "title": "Roasted Ratatouille Pasta"
//   },

//   {
//     "id": 750949,
//     "image": "mexican-macaroni-salad-750949.jpeg",
//     "cookMinutes": 60,
//     "servings": 12,
//     "sourceUrl": "http://www.foodnetwork.com/recipes/ree-drummond/mexican-macaroni-salad.html",
//     "title": "Mexican Macaroni Salad"
//   },

//   {
//     "id": 718981,
//     "image": "cheeseburger-gnocchi-718981.jpg",
//     "cookMinutes": 45,
//     "servings": 4,
//     "sourceUrl": "http://www.kevinandamanda.com/recipes/dinner/cheeseburger-gnocchi.html",
//     "title": "Cheeseburger Gnocchi"
//   },

//   {
//     "id": 864561,
//     "image": "mediterranean-pasta-salad-864561.jpg",
//     "cookMinutes": 25,
//     "servings": 8,
//     "sourceUrl": "http://littlespicejar.com/mediterranean-pasta-salad/",
//     "title": "Mediterranean Pasta Salad"
//   },

//   {
//     "id": 494242,
//     "image": "Pumpkin---Ricotta-Stuffed-Shells-494242.jpg",
//     "cookMinutes": 45,
//     "servings": 10,
//     "sourceUrl": "http://www.loveandoliveoil.com/2013/02/pumpkin-ricotta-stuffed-shells.html",
//     "title": "Pumpkin & Ricotta Stuffed Shells"
//   },

//   {
//     "id": 725830,
//     "image": "bas-best-baked-ziti-725830.jpg",
//     "cookMinutes": 45,
//     "servings": 6,
//     "sourceUrl": "http://www.bonappetit.com/recipe/bas-best-baked-ziti",
//     "title": "BA’s Best Baked Ziti"
//   }
// ]

const styles = {
  loader: {
    margin: 'auto',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

function Recipe() {
  const [recipes, setRecipes] = useState(null);
  const [errors, setErrors] = useState([]);
  const { param } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (param) {
      searchRecipes(param)
        .then(data => {
          setRecipes(data.filter((val, idx, arr) => arr.indexOf(val) === idx));
        })
        .catch(err => setErrors(err));
    } else {
      findAllRecipes()
        .then(data => {
          // setRecipes([...recipes, ...data].filter((val, idx, arr) => arr.indexOf(val) === idx))
          // use this ^^^ instead of the latter to avoid searching to begin adding recipes/ingredients
          setRecipes(data.filter((val, idx, arr) => arr.indexOf(val) === idx))
        })
        .catch(err => setErrors(err));
    }
  }, [param]);

  if (recipes === null) {
    return (
      <div style={styles.loader}>
        <PacmanLoader color="#FEAE65" />
      </div>
    );
  }

  if (recipes.length === 0) {
    return navigate("/notfound", {
      state: {
        msg: `No recipes found searching: ${param}. Try something else.`
      }
    })
  }

  return (
    <Box mx='5%' sx={{ paddingTop: 2 }}>
      <Grid container spacing={2} my={2} >
        {recipes.map(recipe => (
          <Grid key={`${recipe.id}-${recipe.title}`} item xs={12} sm={6} md={4} py={2} sx={{ position: 'static' }}>
            <RecipeCard
              id={recipe.id}
              imageUrl={recipe?.imageUrl || recipe?.image} // anticipate blob image type
              title={recipe.title}
              cookMinutes={recipe.cookMinutes}
              servings={recipe.servings}
            />
          </Grid>
        ))}
      </Grid>
      {errors.length > 0 &&
        <Errors errors={errors} />
      }
    </Box>
  );
}

export default Recipe;