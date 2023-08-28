import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button, Checkbox, Fab, IconButton,
  List, ListItem, ListItemButton,
  ListItemText, Paper, Stack, Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Errors from './errors/Errors';
import AddGroceries from './forms/AddGroceries';
import { findGroceryListByName, updateList } from '../service/userApi';

const EMPTY_LIST = {
  id: 0,
  name: '',
  list: []
};

function GroceryListList() {
  const [mainList, setMainList] = useState(EMPTY_LIST);
  const [errors, setErrors] = useState([]);
  const [checked, setChecked] = useState([0]);
  const navigate = useNavigate();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    findGroceryListByName('Main')
      .then(data => setMainList(data))
      .catch(error => setErrors(error));
  }, []);

  const handleDeleteGroceryItem = (ingredientId) => {
    console.log(ingredientId);
    const ingredient = mainList.list.find(ing => ing.id === ingredientId);
    if (window.confirm(`Delete ingredient ${ingredient.name} from grocery list?`)) {
      const newIngredientList = mainList.list.filter(ing => ing.id !== ingredientId);
      setMainList({ ...mainList, list: newIngredientList });
      updateList(mainList)
        .then(response => console.log(response))
        .catch(error => setErrors(error));
    }
  }

  return (
    <Paper sx={{ height: '100%' }} elevation={4}>
      <Stack p={2} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5'>My Groceries</Typography>
        <Fab color="primary" aria-label="add" size="small" onClick={() => { navigate("/add/ingredient") }}>
          <AddIcon />
        </Fab>
      </Stack>
      <List sx={{ overflow: 'auto', height: '50vh', textAlign: 'center' }}>
        {mainList.list.map(ingredient => (
          <ListItem key={ingredient.id}
            secondaryAction={
              <IconButton mr={3} aria-label="delete" sx={{ color: '#D1483D' }} onClick={() => handleDeleteGroceryItem(ingredient.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={handleToggle(ingredient.id)} dense >
              <Checkbox
                edge="start"
                checked={checked.indexOf(ingredient.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': ingredient.id }}
              />
              <ListItemText primary={ingredient.name} sx={checked.indexOf(ingredient.id) !== -1 ? { textDecoration: 'line-through' } : null} />
            </ListItemButton>
          </ListItem>
        ))}
        {mainList.list.length === 0 &&
        <>
          <Typography px={2} textAlign='center'>Your grocery list is empty...</Typography>
          <Button variant='contained'><Link to='/add/ingredient'>Add groceries</Link></Button>
        </>
        }
      </List>
    </Paper>
  );
}

export default GroceryListList;