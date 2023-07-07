import { Grid, TextField, Select, MenuItem, Typography, OutlinedInput } from '@mui/material';


const RecipeIngredient = ({ units, ingredient, onChange }) => {

    const handleChange = (e) => {
        const nextRecipeIngredient = { ...ingredient };
        let nextValue = e.target.value;
        if (e.target.type === 'number') {
            nextRecipeIngredient[e.target.name] = parseFloat(nextValue, 10);
        } else {
            nextValue = parseInt(nextValue, 10);
            nextRecipeIngredient[e.target.name] = units.find(u => u.id === nextValue);
        }
        console.log(ingredient);
        onChange(nextRecipeIngredient);
    }

    return (
        <Grid container sx={{ width: '50%' }} spacing={2}>
            <Grid item xs={2} sm={3}>
                <TextField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    size='small'
                    minRows={0.0001}
                    required
                    value={ingredient.quantity}
                    onChange={handleChange}
                    sx={{ width: '5rem' }}
                />
            </Grid>
            <Grid item xs={2} sm={3}>
                <Select
                    displayEmpty
                    value={ingredient.unit.id}
                    name="unit"
                    size="small"
                    width='20%'
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ width: '5rem' }}
                >
                    <MenuItem value='0'>
                        Select Unit
                    </MenuItem>
                    {units.length > 0 && units.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                            {unit.abbreviation}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={3} sm={3} md={5}>
                <Typography variant="body1" p={1} textAlign={'left'}>{ingredient.ingredient.name}</Typography>
            </Grid>
        </Grid>
    )
}

export default RecipeIngredient