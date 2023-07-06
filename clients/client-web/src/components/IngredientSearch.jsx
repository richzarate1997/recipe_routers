import { findIngredientByName } from "../service/ingredientApi";
import { useState, useEffect } from "react";
import { Box, TextField, Grid, Autocomplete } from '@mui/material';

const IngredientAutoComplete = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        if (searchQuery !== '') {
            findIngredientByName(searchQuery)
                .then(data => {
                    setSearchResults(data);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (event, newValue) => {
        setSearchQuery(newValue);
    };

    const handleSelect = (event, newValue) => {
        setSelectedIngredients(prevIngredients => [...prevIngredients, newValue]);
        setSearchQuery('');
    };

    return (
        <Box m={1} sx={{display: 'flex'}} component='form'>
            <Autocomplete
                freeSolo
                options={searchResults}
                getOptionLabel={(option) => option.name}
                inputValue={searchQuery}
                onInputChange={handleSearch}
                onChange={handleSelect}
                renderInput={(params) => 
                    <TextField {...params} 
                        placeholder="Search…" 
                        inputProps={{ ...params.inputProps, 'aria-label': 'search' }}
                    />}
            />
            <Grid container spacing={2}>
                {selectedIngredients.map((ingredient, index) => (
                    <Grid item key={index}>
                        <Box>
                            {ingredient.name}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default IngredientAutoComplete;
