import {
  Card, CardActionArea,
  CardContent, CardMedia,
  Box, Grid, Tooltip, Typography
} from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { scrapeRecipe } from '../service/recipeApi';
import { useNavigate } from 'react-router-dom';

const imageBase = "https://spoonacular.com/recipeImages/";


export default function RecipeCard({ id, imageUrl, title, cookMinutes, servings }) {
  const navigate = useNavigate();
  const recipe = {
    id: id,
    title: title,
    servings: servings,
    cookMinutes: cookMinutes
  };
  const renderImage = () => imageUrl.includes(imageBase) ? imageUrl : imageBase + imageUrl;

  const getRecipe = () => {
    scrapeRecipe(recipe)
      .then(data => navigate(`/recipe/${data.id}`))
      .catch(err => console.log(err));
  }
  return (
    <CardActionArea sx={{ width: 345 }}>
      <Tooltip title={title} placement='top' arrow>
        <Card
          sx={{ width: 345, height: 370 }}
          py={2}
          onClick={() => getRecipe()}
        >
          <CardMedia
            component="img"
            height="175"
            image={renderImage()}
            alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
              {title}
            </Typography>
            <Grid container px={2} pt={3} >
              <Grid item xs={12} sm={6} md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginRight: 6,
                  justifyContent: 'center'
                }}>
                <AccessTimeOutlinedIcon />
                <Typography>{cookMinutes} minutes</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                <Box sx={{ justifyContent: 'center' }}>
                  <MenuBookOutlinedIcon />
                </Box>
                <Typography>{servings} servings</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Tooltip>
    </CardActionArea>
  );
}
