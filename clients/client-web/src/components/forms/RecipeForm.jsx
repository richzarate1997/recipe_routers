import { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, updateRecipe, findRecipeById, findAllCuisines } from "../../service/recipeApi";
import { Box, Grid, Button, StepLabel, Stepper, Step, Typography } from "@mui/material";
import Errors from "../Errors";
import RecipeFormStep1 from "../RecipeFormStep1";
import RecipeFormStep2 from "../RecipeFormStep2";
import RecipeFormStep3 from "../RecipeFormStep3";
import RecipeFormStep4 from "../RecipeFormStep4";
import RecipeFormStep5 from "../RecipeFormStep5";
import RecipeContext from '../../contexts/RecipeContext';

const EMPTY_RECIPE = {
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

function RecipeForm() {
    const [recipe, setRecipe] = useState(EMPTY_RECIPE);
    const [ingredients, setIngredients] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [errors, setErrors] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [allCuisines, setAllCuisines] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const obj = {
        recipe: recipe,
        ingredients: ingredients,
        onIngredientAdd(ingreds) {
            setIngredients(ingreds);
        },
        onRecipeIngredientChange(rI) {
            setRecipe({ ...recipe, ingredients: recipeIngredients.filter(i1 => i1.name === rI.name ? rI : i1) });
        },
        onRecipeIngredientAdd(ingred) {
            setRecipeIngredients( [...recipeIngredients, ingred]);
        }
    }

    useEffect(() => {
        if (id) {
            findRecipeById(id)
                .then(data => setRecipe(data))
                .catch(err => {
                    navigate("/error", {
                        state: { msg: err }
                    });
                });
        } else {
            setRecipe(EMPTY_RECIPE);
        }
    }, [id, navigate]);

    useEffect(() => {
        findAllCuisines()
            .then(data => setAllCuisines(data))
            .catch(err => {
                navigate("/error", {
                    state: { msg: err }
                });
            });
    }, [navigate]);

    const handleCuisineChange = (event => {
        const { target: { value } } = event;
        setCuisines(typeof value === 'string' ? value.split(',') : value);
    });

    useEffect(() => {
        const theseCuisines = allCuisines.filter((c1) => cuisines.some((c2) => c2 === c1.name));
        setRecipe({ ...recipe, cuisines: theseCuisines });
    }, [cuisines, allCuisines])

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
        setActiveStep(0);
    };

    const handleSaveRecipe = (event) => {
        event.preventDefault();

        if (recipe.id === 0) {
            createRecipe(recipe)
                .then(data => {
                    navigate("/", {
                        state: { msg: `${recipe.title} was added!` }
                    });
                })
                .catch(err => setErrors(err))
        } else {
            updateRecipe(recipe)
                .then(() => {
                    navigate("/", {
                        state: {
                            msgType: 'success',
                            msg: `${recipe.title} was updated!`
                        }
                    })
                })
                .catch(err => setErrors(err));
        }
    }


    const renderFormStep = (step) => {
        switch (step) {
            case 0:
                return <RecipeFormStep1
                    recipe={recipe} handleChange={handleChange}
                    handleCuisineChange={handleCuisineChange}
                    allCuisines={allCuisines} cuisines={cuisines}
                    header={steps[step]}
                />;
            case 1:
                return <RecipeFormStep2
                    header={steps[step]}
                />;
            case 2:
                return <RecipeFormStep3
                    header={steps[step]}
                />;
            case 3:
                return <RecipeFormStep4
                    instructions={recipe.instructions}
                    handleChange={handleChange}
                    header={steps[step]}
                />;
            case 4:
                return <RecipeFormStep5
                    handleUploadImage={handleUploadImage}
                    header={steps[step]}
                />;
            default:
                return null;
        }
    }

    return (
        <RecipeContext.Provider value={obj}>
            <Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '70vh',
                        px: 3,
                    }}
                >
                    <Box
                        sx={{
                            width: '50%',
                            py: 3,
                            border: '1px solid #FEAE65',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {renderFormStep(activeStep)}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
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
                            </Fragment>
                        )}
                    </Box>
                    <Errors errors={errors} />
                </Box>
            </Grid>
        </RecipeContext.Provider>
    );
}

export default RecipeForm;