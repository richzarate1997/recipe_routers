import {
  Typography, Grid, FormControl, TextField,
  FormControlLabel, FormGroup, Select,
  OutlinedInput, MenuItem, Checkbox, Stack
} from '@mui/material';
import { useEffect, useState } from 'react';

const styles = {
  checkboxes: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}

const RecipeFormStep1 = ({ recipe, handleChange, handleCuisineUpdate, allCuisines, header }) => {
  const [cuisines, setCuisines] = useState([]);

  const handleCuisineChange = (event => {
    const { target: { value } } = event;
    const newCuisines = typeof value === 'string' ? value.split(',') : value;
    handleCuisineUpdate(newCuisines);
  });

  useEffect(() => {
    setCuisines(recipe.cuisines.map(c => c.name));
  }, [recipe]);

  return (
    <>
      <Typography variant='h4' p={2}>{header}</Typography>
      <Stack xs={10} md={8}>
        <FormControl sx={{ width: '100%' }} component='fieldset'>
          <TextField
            label='Title'
            name='title'
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Stack direction='row' py={2} columnGap={3} marginLeft={3}>
          <FormControlLabel
            component='fieldset'
            control={
              <TextField
                label='Servings'
                type='number'
                name='servings'
                InputProps={{ inputProps: { min: '1' } }}
                value={recipe.servings}
                onChange={handleChange}
              />
            }
          />
          <FormControlLabel
            component='fieldset'
            control={
              <TextField
                label='Cook Minutes'
                type='number'
                name='cookMinutes'
                InputProps={{ inputProps: { min: '1' } }}
                value={recipe.cookMinutes}
                onChange={handleChange}
              />
            }
          />
        </Stack>
        <FormControl sx={{ width: '100%' }}>
          <Select
            multiple
            displayEmpty
            value={cuisines}
            onChange={handleCuisineChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.length === 0 ? <em>Select Cuisines</em> : selected.join(', ')}
            inputProps={{ 'aria-label': 'cuisine selection' }}
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
        <Grid item xs={12} pt={3} sx={styles.checkboxes}>
          <FormControl component='fieldset'>
            <FormGroup>
              <FormControlLabel
                label='Vegetarian'
                control={
                  <Checkbox
                    checked={recipe.vegetarian}
                    onChange={handleChange}
                    name='vegetarian'
                  />
                }
              />
              <FormControlLabel
                label='Vegan'
                control={
                  <Checkbox
                    checked={recipe.vegan}
                    onChange={handleChange}
                    name='vegan'
                  />
                }
              />
            </FormGroup>
          </FormControl>
          <FormControl component='fieldset'>
            <FormGroup>
              <FormControlLabel
                label='Dairy Free'
                control={
                  <Checkbox
                    checked={recipe.dairyFree}
                    onChange={handleChange}
                    name='dairyFree'
                  />
                }
              />
              <FormControlLabel
                label='Gluten Free'
                control={
                  <Checkbox
                    checked={recipe.glutenFree}
                    onChange={handleChange}
                    name='glutenFree'
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Stack>
    </>
  );
}

export default RecipeFormStep1