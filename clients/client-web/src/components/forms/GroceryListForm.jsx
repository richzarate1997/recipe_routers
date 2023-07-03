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
                <h1>Grocery List Form</h1>
                <form onSubmit={handleSaveGroceryList}>
                    <div>
                        <TextField
                            label="Name"
                            name="name"
                            value={groceryList.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Autocomplete
                            disablePortal
                            // id="combo-box-demo"
                            // options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Ingredient" />}
                        />
                    </div>
                    <div>
                        <Button component={Link} to="/IngredientForm" variant="contained" color="secondary">
                            Add Ingredient
                        </Button>
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

export default GroceryListForm;