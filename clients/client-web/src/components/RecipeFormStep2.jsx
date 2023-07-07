import { Fragment, useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material';
import IngredientList from './IngredientList';
import Modal from '@mui/material/Modal';
import IngredientForm from './forms/IngredientForm';
import { findAllIngredients } from '../service/ingredientApi';



const RecipeFormStep2 = ({ header, recipe, handleIngredientsChanged }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allIngredients, setAllIngredients] = useState([]);


    useEffect(() => {
        findAllIngredients().then(data => setAllIngredients(data));
    }, [])
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            <Fragment>
                <IngredientList allIngredients={allIngredients} recipeIngredients={recipe.ingredients} handleIngredientsChanged={handleIngredientsChanged}/>
                <Typography variant="h5" p={1}>Or</Typography>
                <Button onClick={handleModalOpen}>
                    Add Ingredient
                </Button>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                >
                    <IngredientForm
                        onClose={handleModalClose}
                    // onIngredientCreate={handleIngredientCreate}
                    />
                </Modal>
            </Fragment>
        </Fragment>
    );
};

export default RecipeFormStep2