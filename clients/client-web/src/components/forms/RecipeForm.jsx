import {
  Box, Grid, Button,
  StepLabel, Stepper, Step,
  Typography, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IngredientForm from './IngredientForm';
import Errors from '../Errors';
import RecipeFormStep1 from '../RecipeFormStep1';
import RecipeFormStep2 from '../RecipeFormStep2';
import RecipeFormStep3 from '../RecipeFormStep3';
import RecipeFormStep4 from '../RecipeFormStep4';
import RecipeFormStep5 from '../RecipeFormStep5';
import { createRecipe, updateRecipe, findRecipeById, findAllCuisines } from '../../service/recipeApi';
import VerifyRecipe from '../VerifyRecipe';

const EMPTY_RECIPE = {
  id: 0,
  userId: 0,
  title: '',
  instructions: '',
  servings: 1,
  cookMinutes: 1,
  imageUrl: '',
  sourceUrl: '',
  image: null,
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  cuisines: [],
  ingredients: []
};

const steps = ['Details', 'Ingredients', 'Quantities', 'Instructions', 'Image'];

function RecipeForm({ userId }) {
  const [recipe, setRecipe] = useState(EMPTY_RECIPE);
  const [errors, setErrors] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [allCuisines, setAllCuisines] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const styles = {
    img: {
      maxHeight: 200,
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      p: 3,
    },
    stepContainer: {
      maxWidth: '90%',
      minWidth: '50%',
      p: 3,
      border: '1px solid #FEAE65',
      borderRadius: '8px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    stepButtons: {
      display: 'flex',
      flexDirection: 'row',
      pt: 2,
    }
  }

  useEffect(() => {
    if (id) {
      findRecipeById(id)
        .then(data => data.userId === userId ? setRecipe(data) : navigate('/profile',
          {
            state: {
              type: 'warning',
              msg: 'Cannot edit other users\' recipes'
            }
          }))
        .catch(err => {
          navigate('/error', {
            state: { msg: err }
          });
        });
    } else {
      setRecipe(EMPTY_RECIPE);
    }
  }, [id, userId, navigate]);

  useEffect(() => {
    findAllCuisines()
      .then(data => setAllCuisines(data))
      .catch(err => {
        navigate('/error', {
          state: { msg: err }
        });
      });
  }, [navigate]);

  const handleIngredientsChanged = (recipeIngredients) => {
    const nextRecipe = { ...recipe, ingredients: recipeIngredients };
    setRecipe(nextRecipe);
  }

  const onRecipeIngredientChange = (rI) => {
    const newRecipeIngredients = recipe.ingredients.map(i => i.ingredient.id === rI.ingredient.id ? rI : i);
    setRecipe({ ...recipe, ingredients: newRecipeIngredients });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRecipeIngredientCreation = (newIngredient) => {
    const newRecipeIngredient = {
      recipeId: recipe.id,
      quantity: 1,
      unit: {
        id: 0,
        abbreviation: '',
        name: ''
      },
      ingredient: newIngredient
    }
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newRecipeIngredient] });
  }

  const handleCuisineChange = (cuisines) => {
    const theseCuisines = allCuisines.filter((c1) => cuisines.some((c2) => c2 === c1.name));
    setRecipe({ ...recipe, cuisines: theseCuisines });
  };

  const handleChange = (event) => {
    const nextRecipe = { ...recipe };
    if (event.target.type === 'checkbox') {
      nextRecipe[event.target.name] = event.target.checked;
    } else {
      let nextValue = event.target.value;
      if (event.target.type === 'number') {
        nextValue = parseFloat(nextValue, 10);
        if (isNaN(nextValue)) {
          nextValue = event.target.value;
        }
      }
      nextRecipe[event.target.name] = nextValue;
    }
    setRecipe(nextRecipe);
  };

  const handleUploadImage = (file) => {
    const nextRecipe = { ...recipe, image: file };
    setRecipe(nextRecipe);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    if (!id) {
      setRecipe(EMPTY_RECIPE);
    } else {
      findRecipeById(id)
        .then(data => setRecipe(data))
    }
    setActiveStep(0);
    setErrors([]);
  };

  const handleSaveRecipe = (event) => {
    event.preventDefault();
    if (recipe.id === 0) {
      createRecipe(recipe)
        .then((data) => {
          navigate(`/recipe/${data.id}`, {
            state: { msg: `${recipe.title} was added!` }
          })
        })
        .catch(err => {
          console.log(err)
          setErrors(err.response.data)
        });
    } else {
      updateRecipe(recipe)
        .then(navigate(`/recipe/${recipe.id}`, {
          state: {
            msgType: 'success',
            msg: `${recipe.title} was updated!`
          }
        }))
        .catch(err => setErrors(err));
    }
  }

  const renderFormStep = (step) => {
    switch (step) {
      case 0:
        return <RecipeFormStep1
          header={steps[step]}
          recipe={recipe}
          handleChange={handleChange}
          handleCuisineUpdate={handleCuisineChange}
          allCuisines={allCuisines}
        />;
      case 1:
        return <RecipeFormStep2
          header={steps[step]}
          recipe={recipe}
          handleIngredientsChanged={handleIngredientsChanged}
          handleOpen={handleOpen}
          open={open}
        />;
      case 2:
        return <RecipeFormStep3
          header={steps[step]}
          recipeIngredients={recipe.ingredients}
          onRecipeIngredientChange={onRecipeIngredientChange}
          fullScreen={fullScreen}
          onIngredientCreation={handleRecipeIngredientCreation}
        />;
      case 3:
        return <RecipeFormStep4
          header={steps[step]}
          instructions={recipe.instructions}
          handleChange={handleChange}
        />;
      case 4:
        return <RecipeFormStep5
          header={steps[step]}
          handleUploadImage={handleUploadImage}
          handleChange={handleChange}
          imageUrl={recipe.imageUrl}
        />;
      default:
        return null;
    }
  }

  return (
    <Grid sx={{ height: '78.5vh'}}>
      <Box component={'form'} onSubmit={handleSaveRecipe}
        sx={styles.form}
      >
        <Box
          sx={styles.stepContainer}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, idx) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{fullScreen ? idx === activeStep ? label : '' : label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant={'h4'} sx={{ mt: 2, mb: 1 }}>
                Verify Recipe
              </Typography>
              <VerifyRecipe recipe={recipe} fullScreen={fullScreen} styles={styles} />
              <Box sx={styles.stepButtons}>
                <Button color='info' onClick={handleBack}>Back</Button>
                <Button type='submit'>Submit</Button>
                <Button color='secondary' onClick={handleReset}>Reset</Button>
              </Box>
              {errors.length > 0 && <Errors errs={errors} />}
            </>
          ) : (
            <>
              {renderFormStep(activeStep)}
              <Box sx={styles.stepButtons}>
                <Button
                  color='info'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <IngredientForm
        fullScreen={fullScreen}
        open={open}
        handleClose={handleClose}
        onIngredientCreation={handleRecipeIngredientCreation}
      />
    </Grid>
  );
}

export default RecipeForm;