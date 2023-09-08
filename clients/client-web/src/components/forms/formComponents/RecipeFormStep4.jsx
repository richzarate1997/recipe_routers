import { Typography, TextField, FormControl } from '@mui/material';

const RecipeFormStep4 = ({ instructions, handleChange, header }) => (
  <>
    <Typography variant='h4' p={2}>{header}</Typography>
    {<FormControl sx={{ m: 5, width: '100%' }} component='fieldset' variant='standard'>
      <TextField
        label='Instructions'
        name='instructions'
        multiline
        rows={11}
        value={instructions}
        onChange={handleChange}
        required
      />
    </FormControl>}
  </>
);

export default RecipeFormStep4;