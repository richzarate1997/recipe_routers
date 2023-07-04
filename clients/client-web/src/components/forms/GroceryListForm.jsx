import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createGroceryList, findGroceryListById, updateGroceryList } from "../../service/groceryListApi";
import { Autocomplete, Button, Box, TextField } from '@mui/material';
import Errors from "../Errors";

const EMPTY_GROCERY_LIST = {
    id: 0,
    name: '',
};

function GroceryListForm() {

    const [groceryList, setGroceryList] = useState(EMPTY_GROCERY_LIST);
    const [errors, setErrors] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            findGroceryListById(id)
                .then(data => setGroceryList(data))
                .catch(err => {
                    navigate("/error", {
                        state: { msg: err }
                    });
                });
        } else {
            setGroceryList(EMPTY_GROCERY_LIST);
        }
    }, [id, navigate]);
    console.log(groceryList)

    const handleChange = (event) => {
        const nextGroceryList = { ...groceryList };

        let nextValue = event.target.value;
        nextGroceryList[event.target.name] = nextValue;


        setGroceryList(nextGroceryList);
    }

    const handleSaveGroceryList = (event) => {
        event.preventDefault();

        if (groceryList.id === 0) {
            createGroceryList(groceryList)
                .then(data => {
                    navigate("/", {
                        state: { msg: `${groceryList.name} was added!` }
                    });
                })
                .catch(err => setErrors(err))
        } else {
            updateGroceryList(groceryList)
                .then(() => {
                    navigate("/", {
                        state: {
                            msgType: 'success',
                            msg: `${groceryList.name} was updated!`
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
                    width: '50%',
                    p: 3,
                    border: '1px solid gray',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '-5%',
                }}
            >
                <h1>Grocery List Form</h1>
                <form onSubmit={handleSaveGroceryList}>
                    <Box sx={{ my: 2 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={groceryList.name}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Autocomplete
                            disablePortal
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Ingredient" />}
                        />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Button component={Link} to="/IngredientForm" variant="contained" color="secondary" sx={{ mr: 2 }}>
                            Add Ingredient
                        </Button>
                        <Button component={Link} to="/IngredientForm" variant="contained" color="secondary">
                            Create Ingredient
                        </Button>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                            Save
                        </Button>
                        <Button component={Link} to="/" variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default GroceryListForm;