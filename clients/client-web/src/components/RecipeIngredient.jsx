import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import {
  Avatar, Grid, IconButton, 
  MenuItem,
  OutlinedInput, Select,
  TextField, Tooltip,
  Typography, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

const RecipeIngredient = ({ index, recipeIngredients, units, recipeIngredient, onChange, onRecipeIngredientCreation }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const nextRecipeIngredient = { ...recipeIngredient };
    let nextValue = e.target.value;
    if (e.target.type === 'number') {
      nextRecipeIngredient[e.target.name] = Math.abs(parseFloat(nextValue, 10));
    } else {
      nextValue = parseInt(nextValue, 10);
      nextRecipeIngredient[e.target.name] = units.find(u => u.id === nextValue);
    }
    onChange(nextRecipeIngredient);
  }

  // const handleIngredientAdd = (ingredient) => {
    // if (recipeIngredients.indexOf(ingredient) )
    // onRecipeIngredientCreation(ingredient)
  // }

  return (
    <Grid container rowSpacing={2} columnGap={3} marginY={0.5} sx={styles.container}>
      <Grid item xs={2} sm={4} sx={styles.name}>
        <Typography variant='overline' p={1} >{recipeIngredient.ingredient.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='Quantity'
          type='number'
          name='quantity'
          size='small'
          inputProps={{ step: '0.5' }}
          required
          value={recipeIngredient.quantity}
          onChange={handleChange}
          sx={{ width: fullScreen ? '4rem' : '5rem' }}
        />
      </Grid>
      <Grid item xs={2}>
        { units.length > 0 &&
        <Select
          defaultValue={0}
          value={recipeIngredient.unit.id}
          name='unit'
          size='small'
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={{ width: fullScreen ? '4rem' : '5rem' }}
        >
          <MenuItem value={0}>
            Unit
          </MenuItem>
          { units.map((unit) => (
            <MenuItem key={unit.id} value={unit.id}>
              <Tooltip title={unit.name}>
                <>
                  {unit.abbreviation || recipeIngredient.ingredient.name}
                </>
              </Tooltip>
            </MenuItem>
          ))}
        </Select>
        }
      </Grid>
      <Grid item xs={2} sx={styles.name}>
        <Avatar alt={recipeIngredient.ingredient.name} src={recipeIngredient.ingredient.imageUrl} />
        <IconButton 
        // onClick={ handleIngredientAdd(recipeIngredient.ingredient) }
        >
          { recipeIngredients.map(ri => ri.ingredient).indexOf(recipeIngredient.ingredient) === index 
          ? <AddCircleSharpIcon color='primary'/>
          : <CancelSharpIcon color='warning'/>
          }
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default RecipeIngredient