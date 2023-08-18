import {
  Alert, Box, FormControlLabel,
  Grid, Switch, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GroceryListList from '../GroceryListList';
import MyRecipes from '../MyRecipes';
import { findUser, update } from '../../service/userApi';

const EMPTY_USER = {
  displayName: '',
  metric: false,
  myLists: [],
  myRecipes: [],
  myFavorites: []
};

const styles = {
  alert: {
    borderRadius: '20px 20px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const Profile = ({ appUser }) => {
  const [user, setUser] = useState(EMPTY_USER);
  const location = useLocation();

  useEffect(() => {
    findUser()
      .then(userData => setUser(userData))
      .catch(err => console.log(err));
  }, [appUser]);

  const label = { inputProps: { 'aria-label': 'Metric/Imperial units preference toggle' } }
  return (
    <Box mx={5} sx={{ paddingTop: 2 }} >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3'>Hey there, {user.displayName}</Typography>
        {location.state &&
          <Alert severity={location.state.type} sx={styles.alert}>
            <Typography variant="subtitle1">
              {location.state.msg}
            </Typography>
          </Alert>
        }
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
        <Grid item xs={12} sm={10} md={4}>
          <MyRecipes recipes={user.myRecipes} favorites={user.myFavorites} />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant='h5'>My Grocery List</Typography>
          {user && <GroceryListList />}
        </Grid>
      </Grid>

    </Box>
  )
}

export default Profile