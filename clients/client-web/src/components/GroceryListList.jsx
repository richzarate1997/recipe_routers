import { List, ListItem, ListItemText, Checkbox, IconButton, Fab } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import { useState, useEffect } from 'react';
import { findGroceryListByName } from '../service/userApi';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Errors from './Errors';
import { useNavigate } from 'react-router-dom';
import AddGroceries from './AddGroceries';

function GroceryListList() {
    const [mainList, setMainList] = useState({
        id: 0,
        name: '',
        list: []

    });
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
    }

   

    return (
        <List>
            <Fab color="primary" aria-label="add" onClick={() => {navigate("/add/ingredient")}}
                sx={{
                    position: 'absolute',
                    top: -35,
                    right: 0
                }}>
                <AddIcon />
            </Fab>
            {mainList.list.map(ingredient => (
                <ListItem key={ingredient.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteGroceryItem(ingredient.id)}>
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
                        <ListItemText primary={ingredient.name} />
                    </ListItemButton>

                </ListItem>
            ))}

        </List>
    );
}

export default GroceryListList;