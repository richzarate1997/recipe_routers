import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createRecipe, updateRecipe, findRecipeById } from "../../service/recipeApi";
import StepLabel from '@mui/material/StepLabel';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, FormControl, TextField, Stepper, Step, Typography } from "@mui/material";
import Errors from "../Errors";
import NavBarSearch from "../NavBarSearch";

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

const steps = ['Recipe Details', 'Add Ingredients', 'Add Instructions', 'Final Details'];

const RecipeFormStep1 = ({ recipe, handleChange }) => (
    <Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step 1</Typography>
        <h1>Recipe Details</h1>
        <div>
            <FormControl sx={{ m: 1, width: '100%' }} component="fieldset" variant="standard">
                <TextField
                    label="Title"
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    required
                />
            </FormControl>
        </div>
        <div>
            <FormControl sx={{ marginLeft: 7, marginTop: 2, marginBottom: 2, marginRight: 2 }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <TextField
                                label="Servings"
                                sx={{ width: '100px' }}
                                type="number"
                                name="servings"
                                value={recipe.servings}
                                onChange={handleChange}
                            />
                        }
                    />
                </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <TextField
                                label="Cook Minutes"
                                sx={{ width: '100px' }}
                                type="number"
                                name="cookMinutes"
                                value={recipe.cookMinutes}
                                onChange={handleChange}
                            />
                        }
                    />
                </FormGroup>
            </FormControl>
        </div>
        <div>
            <FormControl sx={{ marginLeft: 7, marginTop: 2, marginBottom: 2, marginRight: 2 }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={recipe.vegetarian}
                                onChange={handleChange}
                                name="vegetarian"
                            />
                        }
                        label="Vegetarian"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={recipe.vegan}
                                onChange={handleChange}
                                name="vegan"
                            />
                        }
                        label="Vegan"
                    />
                </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={recipe.dairyFree}
                                onChange={handleChange}
                                name="dairyFree"
                            />
                        }
                        label="Dairy Free"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={recipe.glutenFree}
                                onChange={handleChange}
                                name="glutenFree"
                            />
                        }
                        label="Gluten Free"
                    />
                </FormGroup>
            </FormControl>
        </div>
    </Fragment>
);

const RecipeFormStep2 = ({ recipe, handleChange }) => (
    <Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step 2</Typography>
        <h1>Add Ingredients</h1>
        {<Fragment>
            <NavBarSearch />
            <h3>Or</h3>
            <Button component={Link} to="/ingredient" variant="contained" color="primary">
                Add Ingredient
            </Button>
        </Fragment>
        }
    </Fragment>
);

const RecipeFormStep3 = ({ recipe, handleChange }) => (
    <Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step 3</Typography>
        <h1>Add Instructions</h1>
        {<FormControl sx={{ m: 5, width: '80%' }} component="fieldset" variant="standard">
            <TextField
                label="Instructions"
                name="title"
                multiline
                rows={4}
                maxRows={Infinity}
                value={recipe.instructions}
                onChange={handleChange}
                required
            />
        </FormControl>}
    </Fragment>
);

const RecipeFormStep4 = ({ recipe, handleChange }) => (
    <Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step 4</Typography>
        <h1>Final Details</h1>
        {/* Final details form */}
    </Fragment>
);

function RecipeForm() {
    const [recipe, setRecipe] = useState(EMPTY_RECIPE);
    const [errors, setErrors] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

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
    console.log(recipe)

    const handleChange = (event) => {
        const nextRecipe = { ...recipe };

        let nextValue = event.target.value;
        nextRecipe[event.target.name] = nextValue;

        setRecipe(nextRecipe);
    }

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
                return <RecipeFormStep1 recipe={recipe} handleChange={handleChange} />;
            case 1:
                return <RecipeFormStep2 recipe={recipe} handleChange={handleChange} />;
            case 2:
                return <RecipeFormStep3 recipe={recipe} handleChange={handleChange} />;
            case 3:
                return <RecipeFormStep4 recipe={recipe} handleChange={handleChange} />;
            default:
                return null;
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-3%',
                minHeight: '100vh',
                px: 3, // Horizontal padding
            }}
        >
            <Box
                sx={{
                    width: '50%',
                    py: 3, // Vertical padding
                    border: '1px solid gray',
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
        </Box>
    );
}

export default RecipeForm;
