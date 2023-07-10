import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const FavoriteRecipesList = ({ favoriteRecipes }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Favorite Recipes
            </Typography>
            <List>
                {favoriteRecipes?.map((favoriteRecipe) => (
                    <ListItem key={favoriteRecipe.id}>
                        <ListItemText primary={favoriteRecipe.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FavoriteRecipesList;
