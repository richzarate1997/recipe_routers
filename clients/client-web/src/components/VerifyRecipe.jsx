import {
  Box, Grid, Paper, Table,
  TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { renderCooktime, renderIngredientText, renderInstructionText } from './modules/conversions';

const VerifyRecipe = ({ recipe, fullScreen, styles }) => {
  return (
    <Paper sx={{ maxWidth: 800}} elevation={3}>
      <Grid container justifyContent={fullScreen ? 'center' : 'space-evenly'} alignItems='center' >
        <Grid item xs={12} md={4} lg={4} textAlign='center' py={2} px={1}>
          <Typography variant='h5'>{recipe.title}</Typography>
          <Typography variant='body1'>Total Cooktime: {renderCooktime(recipe.cookMinutes)}</Typography>
          <Typography variant='body1'>Serves: {recipe.servings}</Typography>
          <Typography variant='body1'>Cuisines: {recipe.cuisines.length ? recipe.cuisines.map(c => c.name).join(", ") : 'None'}</Typography>
          <Typography variant='body1'>
            Dietary Restrictions:
            {recipe.vegetarian && ' Vegetarian'}
            {recipe.vegetarian && (recipe.vegan || recipe.dairyFree || recipe.glutenFree) ? ',' : ''}
            {recipe.vegan && ' Vegan'}
            {recipe.vegan && (recipe.dairyFree || recipe.glutenFree) ? ',' : ''}
            {recipe.dairyFree && ' Dairy Free'}
            {recipe.dairyFree && recipe.glutenFree ? ',' : ''}
            {recipe.glutenFree && ' Gluten Free'}
            {recipe.vegetarian || recipe.vegan || recipe.dairyFree || recipe.glutenFree ? '' : ' None'}
          </Typography>
        </Grid>
        <Grid item m={2} xs={12} md={7} lg={7}>
          <Typography variant='overline'>Instructions:</Typography>
          <Typography variant='body2' sx={{ maxHeight: 130, overflow: 'auto' }}>
            {renderInstructionText(recipe.instructions)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={fullScreen ? 'center' : 'space-evenly'} alignItems='center'>
        <TableContainer
          component={Paper}
          xs={12} sm={4} md={6} py={2} px={1}
          sx={{ maxWidth: 'fit-content', maxHeight: 250, overflow: 'auto' }}>
          <Table stickyHeader aria-label='ingredient table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='overline'>Ingredients:</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipe.ingredients.map((ri, idx) => (
                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{renderIngredientText(recipe.servings, ri)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} sm={8} md={6} display='flex' justifyContent='center' py={2} px={1}>
          <Tooltip title='Oh Yum!'>
            <Box component='img' alt={recipe.title} src={recipe.imageUrl} sx={styles.img}/>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default VerifyRecipe