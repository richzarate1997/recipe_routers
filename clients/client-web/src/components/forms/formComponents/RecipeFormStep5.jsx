import { Typography, FilledInput, TextField, Grid } from '@mui/material';

const RecipeFormStep5 = ({ handleUploadImage, header, handleChange, imageUrl }) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleUploadImage(btoa(file));
    //TODO: Figure out image upload -- render image on upload to confirm working
    // const formData = new FormData();
    // formData.append('image', image);
    // formData.append('type', 'file');
    // nextRecipe.image = file;
  }

  return (
    <>
      <Typography variant='h4' p={2}>{header}</Typography>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item>
          <FilledInput type='file' accept='image/*' size='small' onChange={handleImageChange} />
        </Grid>
        <Grid item>
          <Typography variant='subtitle1'>or</Typography>
        </Grid>
        <Grid item>
          <TextField
            id='imageUrl'
            name='imageUrl'
            label='Image URL'
            onChange={handleChange}
            variant='outlined'
            value={imageUrl}
            required
            size='small'
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RecipeFormStep5