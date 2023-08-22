import {
  Avatar, Grid, MenuItem,
  OutlinedInput, Select,
  TextField, Tooltip,
  Typography
} from '@mui/material';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const RecipeIngredient = ({ units, ingredient, onChange }) => {

  const handleChange = (e) => {
    const nextRecipeIngredient = { ...ingredient };
    let nextValue = e.target.value;
    if (e.target.type === 'number') {
      nextRecipeIngredient[e.target.name] = Math.abs(parseFloat(nextValue, 10));
    } else {
      nextValue = parseInt(nextValue, 10);
      nextRecipeIngredient[e.target.name] = units.find(u => u.id === nextValue);
    }
    onChange(nextRecipeIngredient);
  }

  return (
    <Grid container rowSpacing={2} columnGap={3} marginY={0.5} sx={styles.container}>
      <Grid item xs={2} sm={4} sx={styles.name}>
        <Typography variant='overline' p={1} >{ingredient.ingredient.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='Quantity'
          type='number'
          name='quantity'
          size='small'
          inputProps={{ step: '0.5' }}
          required
          value={ingredient.quantity}
          onChange={handleChange}
          sx={{ width: '5rem' }}
        />
      </Grid>
      <Grid item xs={2}>
        { units.length > 0 &&
        <Select
          defaultValue={0}
          value={ingredient.unit.id}
          name='unit'
          size='small'
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={{ width: '5rem' }}
        >
          <MenuItem value={0}>
            Unit
          </MenuItem>
          { units.map((unit) => (
            <MenuItem key={unit.id} value={unit.id}>
              <Tooltip title={unit.name}>
                <>
                  {unit.abbreviation || ingredient.ingredient.name}
                </>
              </Tooltip>
            </MenuItem>
          ))}
        </Select>
        }
      </Grid>
      <Grid item xs={2} sx={styles.name}>
        <Avatar alt={ingredient.ingredient.name} src={ingredient.ingredient.imageUrl} />
      </Grid>

    </Grid>
  )
}

export default RecipeIngredient