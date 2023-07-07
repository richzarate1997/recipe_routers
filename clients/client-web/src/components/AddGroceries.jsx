import { Button, Typography, Grid, CardContent, Card, Container } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { findAllIngredients } from "../service/ingredientApi";
import { findGroceryListByName } from "../service/userApi";
import Errors from "./Errors";
import { updateList } from "../service/userApi";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(ing, ingredient, theme) {
    return {
        fontWeight:
            ingredient.indexOf(ing) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function AddGroceries() {
    const theme = useTheme();
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [error, setError] = useState([]);
    const [groceryList, setGroceryList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        findAllIngredients()
            .then(data => setIngredients(data))
            .catch(err => setError(err));
        findGroceryListByName('Main')
            .then(data => setGroceryList(data))
            .then(console.log(groceryList))
            .catch(error => setError(error));
    }, []);


    const handleChange = (event) => {
        const { target: { value }, } = event;
        setIngredient(typeof value === 'string' ? value.split(',') : value,);
    };

    // {
    //     "id": 5,
    //     "userId": 1,
    //     "name": "Semi Urgent Groceries",
    //     "list": [
    //       {
    //         "id": 3,
    //         "name": "Tomato",
    //         "imageUrl": "https://tomato.com/tomato.jpg",
    //         "aisle": "Produce"
    //       }
    //     ]
    //   }
    const handleAddIngredients = () => { 
        console.log(ingredient);
        const newIngredients = ingredients.filter((ing) => ingredient.some((ing1) => ing1 === ing.name));
        const newIngredientList = [...groceryList.list, ...newIngredients];
        setGroceryList({...groceryList, list:newIngredientList});
        // const newGroceryList = {...groceryList, list: newIngredientList};
        console.log(newIngredientList);
        // updateList(newGroceryList)
        //     .then(response => {
        //         console.log(response.data);})
        //     .catch(error => setError(error));
        
        // navigate('/');

    }
    return (
        <div>
            
                <Card sx={{ maxWidth: "50%", marginX: "25%", marginY:"5%"}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h4">Add Ingredients</Typography>
                                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                                    <Select
                                        multiple
                                        displayEmpty
                                        value={ingredient}
                                        onChange={handleChange}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Placeholder</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Placeholder</em>
                                        </MenuItem>
                                        {ingredients.map((ing) => (
                                            <MenuItem
                                                key={ing.id}
                                                value={ing.name}
                                                style={getStyles(ing, ingredient, theme)}
                                            >
                                                {ing.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid >
                            <Grid item xs={12}>
                                <Button onClick={handleAddIngredients}>Add Ingredients</Button>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Errors />
                            </Grid> */}
                        </Grid>
                    </CardContent>
                </Card>
        </div>
    );
}



export default AddGroceries;