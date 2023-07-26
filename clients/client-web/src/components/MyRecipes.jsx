import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
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

export default function MyRecipes({ recipes, favorites }) {
  const [value, setValue] = useState(0);
  const [myFavorites, setMyFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    setMyRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    setMyFavorites(favorites);
  }, [favorites]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();



  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="recipe tabs"
        >
          <Tab value={0} label="My Recipes" />
          <Tab value={1} label="My Favorites" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {myRecipes?.map(recipe => (
          <ListItem key={recipe.id}>
            <ListItemButton onClick={() => (navigate(`/recipe/${recipe.id}`))}  >
              <ListItemText>{recipe.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {myFavorites?.map(favorite => (
          <ListItem key={favorite.id}>
            <ListItemButton onClick={() => navigate(`/recipe/${favorite.id}`)} >
              <ListItemText>{favorite.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </TabPanel>
    </Box>
  );
}