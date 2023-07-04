import { findUser, update } from '../../service/userApi';
import { Box, FormControlLabel, Grid, Typography, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import GroceryLists from '../GroceryLists';
import MyRecipes from '../MyRecipes';

const Profile = ({ appUser }) => {
    const [user, setUser] = useState({
        displayName: '',
        metric: false,
        myLists: [],
        MyRecipes: [],
        myFavorites: []
    });

    useEffect(() => {
        findUser()
            .then(data => {
                setUser(data)
            })
            .catch(err => console.log(err));
    }, [appUser]);

    // Need to setup onChange method(s)

    const label = { inputProps: { 'aria-label': 'Metric/Imperial units preference toggle' } }
    return (
        <Box mx={5} sx={{ paddingTop: 2 }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>Oh Hi, {user.displayName}</Typography>
                <FormControlLabel
                    control={<Switch {...label}
                        checked={user.metric}
                        color="default" />
                    }
                    label="Metric / Imperial"
                    labelPlacement='top'
                />
            </div>
            <Grid container spacing={2} mx='auto' my={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <MyRecipes />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Typography variant='h5'>My Grocery Lists</Typography>
                    {user && <GroceryLists gLists={user.myLists} />}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Profile