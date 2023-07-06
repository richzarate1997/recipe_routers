import { Fragment } from 'react'
import { Typography, TextField, FormControl } from '@mui/material';


const RecipeFormStep4 = ({ instructions, handleChange, header }) => (

    <Fragment>
        <Typography variant="h4" p={2}>{header}</Typography>
        {<FormControl sx={{ m: 5, width: '80%' }} component="fieldset" variant="standard">
            <TextField
                label="Instructions"
                name="instructions"
                multiline
                rows={10}
                value={instructions}
                onChange={handleChange}
                required
            />
        </FormControl>}
    </Fragment>
);

export default RecipeFormStep4;