import { Fragment, useEffect, useState } from 'react'
import {
    Typography, Grid, FormControl, TextField,
    FormControlLabel, FormGroup, Select,
    OutlinedInput, MenuItem, Checkbox
} from '@mui/material';

const RecipeFormStep1 = ({ recipe, handleChange, handleCuisineUpdate, allCuisines, header }) => {
    const [cuisines, setCuisines] = useState([]);

    const handleCuisineChange = (event => {
        const { target: { value } } = event;
        setCuisines(typeof value === 'string' ? value.split(',') : value);
    });
    
    useEffect(() => {
        handleCuisineUpdate(cuisines);
    }, [cuisines, handleCuisineUpdate]);
    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            <Grid container  >
                <Grid item xs={12} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <FormControl sx={{ width: '70%' }} component="fieldset" variant="standard">
                        <TextField
                            label="Title"
                            name="title"
                            value={recipe.title}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} py={2} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'left'
                }}>
                    <Grid item xs={6}>
                        <FormControl sx={{
                            width: '70%',
                            marginLeft: '27%',
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <TextField
                                            label="Servings"
                                            type="number"
                                            name="servings"
                                            InputProps={{ inputProps: { min: '1' }}}
                                            value={recipe.servings}
                                            onChange={handleChange}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl component="fieldset" variant="standard" sx={{
                            width: '70%',
                            display: 'flex',
                            marginLeft: '12%',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <TextField
                                            label="Cook Minutes"
                                            type="number"
                                            name="cookMinutes"
                                            InputProps={{ inputProps: { min: '1' }}}
                                            value={recipe.cookMinutes}
                                            onChange={handleChange}
                                        />
                                    }
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <FormControl sx={{ width: '70%' }}>
                        <Select
                            multiple
                            displayEmpty
                            value={cuisines}
                            onChange={handleCuisineChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Select Cuisines</em>;
                                }
                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value=''>
                                <em>Select Cuisines</em>
                            </MenuItem>
                            {allCuisines.map((cuisine) => (
                                <MenuItem key={cuisine.id} value={cuisine.name}>
                                    {cuisine.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <FormControl component="fieldset" variant="standard">
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
                    <FormControl component="fieldset" variant="standard">
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
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default RecipeFormStep1