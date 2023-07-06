import { List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { findAllGroceryListsByUser, findGroceryListById } from '../service/userApi';
import Errors from './Errors';

function GroceryListList() {
    const [allList, setAllList] = useState([]);
    const [mainList, setMainList] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        findAllGroceryListsByUser()
            .then(data => setAllList(data))
            .catch(error => setErrors(error));
    }, []);
    
    useEffect(() => {
        const newList = allList.find(list => list.name === 'Main');
        console.log(newList);
        if(newList != null){
            console.log(newList);
            findGroceryListById(newList.id)
            .then(data => setMainList(data))
            .catch(error => setErrors(error));
        }
    }, []);

    console.log(mainList);

    return (
        <List>
            mainList.map(ingredient)
            <ListItem>
                <ListItemText>

                </ListItemText>
            </ListItem>
        </List>
    );
}

export default GroceryListList;