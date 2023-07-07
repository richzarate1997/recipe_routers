import { List, ListItem, ListItemText, Checkbox } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import { useState, useEffect } from 'react';
import { findAllGroceryListsByUser, findGroceryListById } from '../service/userApi';
import Errors from './Errors';

function GroceryListList() {
    const [allList, setAllList] = useState([]);
    const [mainList, setMainList] = useState({
        id: 0,
        name: '',
        list: []

    });
    const [errors, setErrors] = useState([]);
    const [checked, setChecked] = useState([0]);

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
        findAllGroceryListsByUser()
            .then(data => {
                setAllList(data);
                setMainList(data.find(list => list.name === 'Main'));
            })
            .catch(error => setErrors(error));
    }, []);

    
    
    useEffect(() => {
            // list id can't be zero, will fail 404.
            if (mainList.id !== 0) {
                findGroceryListById(mainList.id)
                    .then(data => setMainList(data))
                    .catch(error => setErrors(error));
            }
        
    }, []);


    return (
        <List>
            {mainList.list.map(ingredient => (
                <ListItem key={ingredient.id}>
                    <ListItemButton onClick={handleToggle(ingredient.id)} dense >
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(ingredient.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby':  ingredient.id }}
                        />
                        <ListItemText primary={ingredient.name} />
                    </ListItemButton>
                    
                </ListItem>
            ))}

        </List>
    );
}

export default GroceryListList;