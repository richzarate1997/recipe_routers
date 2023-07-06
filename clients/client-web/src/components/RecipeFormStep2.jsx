import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import IngredientSearch from "./IngredientSearch"
import IngredientList from './IngredientList';

const RecipeFormStep2 = ({ ingredients, handleIngredientChange, header }) => (
    <Fragment>
        <Typography variant="h4" p={2}>{header}</Typography>
        {<Fragment>
            <IngredientList />
            <Typography variant="h5" p={1}>Or</Typography>
            <Button component={Link} to="/ingredient" variant="contained" color="primary">
                Add Ingredient
            </Button>
        </Fragment>
        }
    </Fragment>
);

export default RecipeFormStep2