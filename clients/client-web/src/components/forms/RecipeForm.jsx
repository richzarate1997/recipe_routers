import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createRecipe, updateRecipe, findRecipeById } from "../../service/recipeApi";
import StepLabel from '@mui/material/StepLabel';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, FormControl, TextField, Stepper, Step, Typography } from "@mui/material";
import Errors from "../Errors";

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

const steps = ['Recipe Details', 'Add Ingredients', 'Add Instructions', 'Final Details']

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

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'-3%',
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
                    
                }}>
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
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <h1>Recipe Form</h1>
                        
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
                                <FormControl sx={{ marginLeft: 7, marginTop: 2, marginBottom: 2, marginRight: 2}} component="fieldset" variant="standard">
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
                                                    name="dairyfree"
                                                />
                                            }
                                            label="Dairy Free"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={recipe.glutenFree}
                                                    onChange={handleChange}
                                                    name="gluten free"
                                                />
                                            }
                                            label="Gluten Free"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </div>
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
        // <Box
        //     sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         minHeight: '100vh',
        //         px: 3, // Horizontal padding
        //     }}
        // >
        //     <Box
        //         sx={{
        //             width: '50%',
        //             py: 3, // Vertical padding
        //             border: '1px solid gray',
        //             borderRadius: '8px',
        //             backgroundColor: '#fff',
        //             display: 'flex',
        //             flexDirection: 'column',
        //             alignItems: 'center',
        //         }}
        //     >
        //         <h1>Recipe Form</h1>
        //         <form onSubmit={handleSaveRecipe}>
        //             <div>
        //                 <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        //                     <TextField
        //                         label="Title"
        //                         name="title"
        //                         value={recipe.title}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </FormControl>
        //             </div>
        //             <div>
        //                 <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        //                     <FormGroup>
        //                         <FormControlLabel
        //                             control={
        //                                 <TextField
        //                                     label="Servings"
        //                                     sx={{ width: '100px' }}
        //                                     type="number"
        //                                     name="servings"
        //                                     value={recipe.servings}
        //                                     onChange={handleChange}
        //                                 />
        //                             }
        //                         />
        //                     </FormGroup>
        //                 </FormControl>
        //                 <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        //                     <FormGroup>
        //                         <FormControlLabel
        //                             control={
        //                                 <TextField
        //                                     label="Cook Minutes"
        //                                     sx={{ width: '100px' }}
        //                                     type="number"
        //                                     name="cookMinutes"
        //                                     value={recipe.cookMinutes}
        //                                     onChange={handleChange}
        //                                 />
        //                             }
        //                         />
        //                     </FormGroup>
        //                 </FormControl>
        //             </div>
        //             <div>
        //                 <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        //                     <FormGroup>
        //                         <FormControlLabel
        //                             control={
        //                                 <Checkbox
        //                                     checked={recipe.vegetarian}
        //                                     onChange={handleChange}
        //                                     name="vegetarian"
        //                                 />
        //                             }
        //                             label="Vegetarian"
        //                         />
        //                         <FormControlLabel
        //                             control={
        //                                 <Checkbox
        //                                     checked={recipe.vegan}
        //                                     onChange={handleChange}
        //                                     name="vegan"
        //                                 />
        //                             }
        //                             label="Vegan"
        //                         />
        //                     </FormGroup>
        //                 </FormControl>
        //                 <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        //                     <FormGroup>
        //                         <FormControlLabel
        //                             control={
        //                                 <Checkbox
        //                                     checked={recipe.dairyFree}
        //                                     onChange={handleChange}
        //                                     name="dairyfree"
        //                                 />
        //                             }
        //                             label="Dairy Free"
        //                         />
        //                         <FormControlLabel
        //                             control={
        //                                 <Checkbox
        //                                     checked={recipe.glutenFree}
        //                                     onChange={handleChange}
        //                                     name="gluten free"
        //                                 />
        //                             }
        //                             label="Gluten Free"
        //                         />
        //                     </FormGroup>
        //                 </FormControl>
        //             </div>
        //             <div>
        //                 <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
        //                     Next
        //                 </Button>
        //                 <Button
        //                     component={Link}
        //                     to="/"
        //                     variant="contained"
        //                     color="secondary"
        //                     sx={{ m: 2 }}
        //                 >
        //                     Cancel
        //                 </Button>
        //             </div>
        //         </form>
        //     </Box>
        // </Box>
    );

}

export default RecipeForm;