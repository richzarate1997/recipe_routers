import {
  Alert, Box, FormControlLabel,
  Grid, Switch, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GroceryListList from '../GroceryListList';
import MyRecipes from '../MyRecipes';
import { findUser } from '../../service/userApi';

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
      .catch(() => appUser.signOut());
  }, [appUser]);

  // const label = { inputProps: { 'aria-label': 'Metric/Imperial units preference toggle' } };

  return (
    <Box mx={5} py={2}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3'>{user.displayName}'s Profile</Typography>
        {location.state &&
          <Alert severity={location.state.type} sx={styles.alert}>
            <Typography variant="subtitle1">
              {location.state.msg}
            </Typography>
          </Alert>
        }
        {/* <FormControlLabel
          control={<Switch {...label}
            checked={user.metric}
            color="default" />
          }
          label="Metric / Imperial"
          labelPlacement='top'
        /> */}
      </div>
      <Grid container columnGap={2} my={2} rowGap={4} justifyContent={{ sm: 'center', md: 'space-evenly'}}>
        <Grid item xs={12} sm={12} md={5}>
          <MyRecipes recipes={user.myRecipes} favorites={user.myFavorites} />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          {user && <GroceryListList />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile;