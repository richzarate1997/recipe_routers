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
    <>
      <Grid container justifyContent={fullScreen ? 'center' : 'space-around'} alignItems='center'>
        <Grid item xs={12} sm={6} textAlign='center'>
          <Typography variant='h6'>Title: {recipe.title}</Typography>
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
        <Grid item xs={12} sm={6} display='flex' justifyContent='center' px={3}>
          <Tooltip title='Oh Yum!'>
            <Box component='img' alt={recipe.title} src={recipe.imageUrl} sx={styles.img} borderRadius='20px' />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container m={2} px={2} justifyContent={fullScreen ? 'center' : 'space-around'} alignItems='center'>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 'fit-content', maxHeight: 300, overflow: 'auto' }}>
          <Table stickyHeader aria-label='ingredient table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='overline'>Ingredients:</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipe.ingredients.map((ri) => (
                <TableRow
                  key={ri.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{renderIngredientText(recipe.servings, ri)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item m={2}>
          <Typography variant='overline'>Instructions:</Typography>
          <Typography variant='body2' sx={{ maxHeight: 270, overflow: 'auto', maxWidth: '60vw' }}>
            {renderInstructionText(recipe.instructions)}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default VerifyRecipe