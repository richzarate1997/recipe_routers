import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createIngredient, findIngredientById } from "../../service/IngredientApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Errors from "../Errors";

const EMPTY_INGREDIENT = {
    id: 0,
    name: '',
    aisle: '',
    imageUrl: '',
};

function IngredientForm() {
    const [ingredient, setIngredient] = useState(EMPTY_INGREDIENT);
    const [errors, setErrors] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            findIngredientById(id)
                .then(data => setIngredient(data))
                .catch(err => {
                    navigate("/error", {
                        state: { msg: err }
                    });
                });
        } else {
            setIngredient(EMPTY_INGREDIENT);
        }
    }, [id, navigate]);
    // console.log(ingredient)

    const handleChange = (event) => {
        const nextIngredient = { ...ingredient };

        let nextValue = event.target.value;

        nextIngredient[event.target.name] = nextValue;


        setIngredient(nextIngredient);
    }

    const handleSaveIngredient = (event) => {
        event.preventDefault();

        createIngredient(ingredient)
            .then(data => {
                navigate("/", {
                    state: { msg: `${ingredient.name} was added!` }
                });
            })
            .catch(err => setErrors(err))
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
                <h1>Ingredient Form</h1>
                <form onSubmit={handleSaveIngredient}>
                    <div>
                        <TextField
                            label="Name"
                            name="name"
                            value={ingredient.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Aisle"
                            name="aisle"
                            value={ingredient.aisle}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Image URL"
                            name="imageUrl"
                            value={ingredient.imageUrl}
                            onChange={handleChange}
                        />
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

export default IngredientForm;