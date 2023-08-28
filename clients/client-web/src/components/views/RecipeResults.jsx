import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import Errors from "../errors/Errors";
import RecipeCard from "../RecipeCard";
import { searchRecipes, findAllRecipes } from "../../service/recipeApi";

const styles = {
  loader: {
    margin: 'auto',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  none: {
    display: 'flex',
    justifyContent: 'center',
    marginY: '20%'
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
          setRecipes(data.filter((val, idx, arr) => arr.indexOf(val) === idx));
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

  if (recipes.length === 0) { // check if just the recipes page, to confirm if `param` exists
    if (param) {
      return navigate('/notfound', {
        state: {
          msg: `No recipes found searching: ${param}. Try searching something else.`
        }
      })
    } else {
      return <Typography variant="h4" sx={styles.none}>There are currently no recipes to display.</Typography>;
    }
  }

  return (
    <Box p={4}>
      <Grid container
        justifyContent='space-around'
        spacing={5}
      >
        {recipes.map(recipe => (
          <Grid key={`${recipe.id}-${recipe.title}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
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