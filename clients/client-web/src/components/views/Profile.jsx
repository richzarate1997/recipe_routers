import { findUser, update } from '../../service/userApi';
import { Box, FormControlLabel, Grid, Typography, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import GroceryListList from '../GroceryListList';
import MyRecipes from '../MyRecipes';


const Profile = ({ appUser }) => {
  const [user, setUser] = useState({
    displayName: '',
    metric: false,
    myLists: [],
    myRecipes: [],
    myFavorites: []
  });

  useEffect(() => {
    findUser()
      .then(data => {
        setUser(data)
        console.log(data);
      })
      .catch(err => console.log(err));
  }, [appUser]);

  const label = { inputProps: { 'aria-label': 'Metric/Imperial units preference toggle' } }
  return (
    <Box mx={5} sx={{ paddingTop: 2 }} >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3'>Hey there, {user.displayName}</Typography>
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
          <MyRecipes recipes={user.myRecipes} favorites={user.myFavorites} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant='h5'>My Grocery List</Typography>
          {user && <GroceryListList />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile