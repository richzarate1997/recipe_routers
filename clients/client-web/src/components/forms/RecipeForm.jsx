import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createRecipe, updateRecipe, findRecipeById } from "../../service/recipeApi";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, FormControl, TextField } from "@mui/material";
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

function RecipeForm() {
    const [recipe, setRecipe] = useState(EMPTY_RECIPE);
    const [errors, setErrors] = useState([]);

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
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    width: '400px',
                    p: 3,
                    border: '1px solid gray',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>Recipe Form</h1>
                <form onSubmit={handleSaveRecipe}>
                    <div>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
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
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

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
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
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
                        <TextField
                            label="Image URL"
                            name="imageUrl"
                            value={recipe.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Source URL"
                            name="sourceUrl"
                            value={recipe.sourceUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={recipe.vegetarian} onChange={handleChange} name="vegetarian" />
                                    }
                                    label="Vegetarian"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={recipe.vegan} onChange={handleChange} name="vegan" />
                                    }
                                    label="Vegan"
                                />

                            </FormGroup>
                        </FormControl>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={recipe.dairyFree} onChange={handleChange} name="dairyfree" />
                                    }
                                    label="Dairy Free"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={recipe.glutenFree} onChange={handleChange} name="gluten free" />
                                    }
                                    label="Gluten Free"
                                />

                            </FormGroup>
                        </FormControl>

                    </div>
                    <div>
                        <TextField fullWidth
                            label="Instructions"
                            name="instructions"
                            value={recipe.instructions}
                            onChange={handleChange}
                        />

                    </div>
                    <div>
                        <Button component={Link} to="/IngredientForm" variant="contained" color="secondary">
                            Create Ingredient
                        </Button>
                    </div>
                    <div>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                        <Button component={Link} to="/" variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Box>
    );
}

export default RecipeForm;