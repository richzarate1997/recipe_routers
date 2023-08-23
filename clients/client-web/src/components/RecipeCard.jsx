import {
  Card, CardActionArea,
  CardContent, CardMedia,
  Grid, Tooltip, Typography
} from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
import { renderCooktime } from './modules/conversions';
import { scrapeRecipe } from '../service/recipeApi';

const imageBase = 'https://spoonacular.com/recipeImages/';

const styles = {
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}

export default function RecipeCard({ id, imageUrl, title, cookMinutes, servings }) {
  const navigate = useNavigate();
  const recipe = {
    id,
    title,
    servings,
    cookMinutes
  };
  // TODO: Consider ways to guarantee image rendering with user created image urls and blobs...
  const renderImage = () => imageUrl.includes(imageBase) ? imageUrl : imageBase + imageUrl;

  const getRecipe = () => {
    scrapeRecipe(recipe)
      .then(data => navigate(`/recipe/${data.id}`))
      .catch(err => console.log(err));
  }

  return (
    <Tooltip title={title} placement='top' arrow>
      <Card py={2} height={370} onClick={() => getRecipe()}>
        <CardActionArea >
          <CardMedia
            component='img'
            height='175'
            image={renderImage()}
            alt={title} />
          <CardContent sx={styles.content}>
            <Typography gutterBottom variant='h5' component='div' textAlign='center'>
              {title}
            </Typography>
            <Grid container sx={styles.gridContainer}>
              <Grid item xs={12} sm={6} md={4}
                sx={styles.gridItem}>
                <AccessTimeOutlinedIcon />
                <Typography>{renderCooktime(cookMinutes)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}
                sx={styles.gridItem}>
                <PeopleAltIcon />
                <Typography>{servings} servings</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
