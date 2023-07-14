import { Grid, Stack, TextField, Select, MenuItem, Typography, OutlinedInput, Tooltip } from '@mui/material';


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
        onChange(nextRecipeIngredient);
    }

    return (
        <Grid container rowSpacing={2} sx={{ margin: 'auto' }} justifyContent={'center'}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    size='small'
                    InputProps={{ inputProps: { step: "0.5" } }}
                    required
                    value={ingredient.quantity}
                    onChange={handleChange}
                    sx={{ width: '5rem' }}
                />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
                <Select
                    required
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
                    <MenuItem disabled value='0'>
                        Unit
                    </MenuItem>
                    {units.length > 0 && units.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                            <Tooltip title={unit.name || ingredient.ingredient.name}>
                                {unit.abbreviation || ingredient.ingredient.name}
                            </Tooltip>
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={3} sm={3} md={4} lg={4}>
                <Typography variant="body1" p={1} textAlign={'left'}>{ingredient.ingredient.name}</Typography>
            </Grid>
        </Grid>
    )
}

export default RecipeIngredient