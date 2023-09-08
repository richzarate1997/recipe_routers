import { FavoriteBorder } from '@mui/icons-material';
import {
  Avatar, Box, Button, List, 
  ListItem, ListItemAvatar, 
  ListItemButton, ListItemText, 
  Paper, Tab, Tabs, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <List>{children}</List>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function MyRecipes({ recipes, favorites }) {
  const [value, setValue] = useState(0);
  const [myFavorites, setMyFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMyRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    setMyFavorites(favorites);
  }, [favorites]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ height: '100%' }} elevation={4}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='primary'
          indicatorColor='primary'
          variant='contained'
          aria-label='recipe tabs'
        >
          <Tab value={0} label='My Recipes' />
          <Tab value={1} label='My Favorites' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <List sx={{ overflow: 'auto', height: '50vh', textAlign: 'center' }}>
          {myRecipes?.map(recipe => (
            <ListItem key={recipe.id}>
              <ListItemButton onClick={() => (navigate(`/recipe/${recipe.id}`))}>
                <ListItemAvatar>
                  <Avatar alt={recipe.title} src={recipe.imageUrl} />
                </ListItemAvatar>
                <ListItemText>{recipe.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          {myRecipes.length === 0 &&
            <>
              <Typography sx={{ margin: 2 }}>You currently have no recipes...</Typography>
              <Button variant='contained'><Link to='/new/recipe'>Create a recipe</Link></Button>
            </>
          }
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List sx={{ overflow: 'auto', height: '50vh', textAlign: 'center' }}>
          {myFavorites?.map(favorite => (
            <ListItem key={favorite.id}>
              <ListItemButton onClick={() => navigate(`/recipe/${favorite.id}`)}>
                <ListItemAvatar>
                  <Avatar alt={favorite.title} src={favorite.imageUrl} />
                </ListItemAvatar>
                <ListItemText>{favorite.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          {myFavorites.length === 0 &&
            <>
              <Typography>You currently have no favorites...</Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 2 }}>Look for the  "<FavoriteBorder />"  to favorite one</Typography>
              <Button variant='contained'><Link to='/recipes'>Explore recipes</Link></Button>
            </>
          }
        </List>
      </TabPanel>
    </Paper>
  );
}

export default MyRecipes;