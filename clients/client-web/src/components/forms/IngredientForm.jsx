import {
  Box, Button, Checkbox, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  FormControlLabel, FormGroup,
  Grid, Stack, TextField
} from '@mui/material/';
import { useState } from "react";
import Errors from "../Errors";
import { hyphenate } from '../modules/conversions';
import { createIngredient } from "../../service/ingredientApi";

const EMPTY_INGREDIENT = {
  id: 0,
  name: '',
  aisle: '',
  imageUrl: '',
};

const styles = {
  formGroup: {
    margin: 4,
  },
  dialog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  img: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  urlInput: {
    marginBottom: 4,
  }
}

function IngredientForm({ fullScreen, open, handleClose, onIngredientCreation }) {
  const [ingredient, setIngredient] = useState(EMPTY_INGREDIENT);
  const [errors, setErrors] = useState([]);
  const [urlManualEntry, setUrlManualEntry] = useState(false);

  const handleChange = (event) => {
    const nextIngredient = { ...ingredient };
    if (event.target.type === 'checkbox') {
      setUrlManualEntry(event.target.checked);
      if (!event.target.checked) {
        nextIngredient['imageUrl'] = `https://spoonacular.com/cdn/ingredients_100x100/${hyphenate(nextIngredient['name'])}.jpg`
      }
    }
    let nextValue = event.target.value;
    nextIngredient[event.target.name] = nextValue;
    if (event.target.name === 'name' && !urlManualEntry) {
      nextIngredient['imageUrl'] = `https://spoonacular.com/cdn/ingredients_100x100/${hyphenate(nextValue)}.jpg`;
    }
    setIngredient(nextIngredient);
  }

  const handleSaveIngredient = (event) => {
    event.preventDefault();

    createIngredient(ingredient)
      .then((data) => {
        onIngredientCreation(data);
        handleCancel();
      })
      .catch(err => setErrors(err.response.data));
  }

  const handleCancel = () => {
    setErrors([]);
    setIngredient(EMPTY_INGREDIENT);
    setUrlManualEntry(false);
    handleClose();
  }

  return (
    <Dialog
      sx={styles.dialog}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='new-ingredient-form'
    >
      <DialogTitle id='new-ingredient-form'>New Ingredient</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {errors.length > 0 && <Errors errs={errors} />}
        </DialogContentText>
        <DialogActions>
          <Box component={'form'} onSubmit={handleSaveIngredient} >
            <Stack direction={'row'} alignItems={'center'}>
              <Grid item>
                <FormGroup sx={styles.formGroup}>
                  <TextField
                    label="Name"
                    name="name"
                    value={ingredient.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup sx={styles.formGroup}>
                  <TextField
                    label="Grocery Aisle"
                    name="aisle"
                    value={ingredient.aisle}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Grid>
              <Grid item sx={styles.img}>
                <Box component='img' alt={ingredient.name} src={ingredient.imageUrl} height={100} />
                <FormControlLabel
                  label="Manually Enter Image URL"
                  control={
                    <Checkbox
                      checked={urlManualEntry}
                      onChange={handleChange}
                      name="urlManualEntry"
                    />
                  }
                />
              </Grid>
            </Stack>
            {urlManualEntry && <FormGroup sx={ styles.urlInput }>
              <TextField
                label="Image URL"
                name="imageUrl"
                value={ingredient.imageUrl}
                onChange={handleChange}
              />
            </FormGroup>
            }
            <FormGroup >
              <Stack direction='row' justifyContent='space-between'>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
                <Button onClick={handleCancel} variant="contained" color="secondary">
                  Cancel
                </Button>
              </Stack>
            </FormGroup>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default IngredientForm;