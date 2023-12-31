import {
  Avatar, Box, IconButton,
  Menu, MenuItem, Tooltip,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserIconMenu = ({ auth }) => {
  const [anchorUser, setAnchorUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  };

  function stringAvatar(name) {
    const upper = name.toUpperCase();
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: upper.includes(' ') ? `${upper.split(' ')[0][0]}${upper.split(' ')[1][0]}` : `${upper[0]}`,
    };
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open user menu options'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar {...stringAvatar(auth.user.username)} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center' to={`/profile`} component={Link}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center' to={`/new/recipe`} component={Link}>Create Recipe</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center' to={`/add/grocerylist`} component={Link}>Create Grocery List</Typography>
                </MenuItem> */}
        {/* <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center' to={`/myfavorites`} component={Link}>My Favorites</Typography>
                </MenuItem> */}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center' onClick={() => auth.signOut()} component={Link}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserIconMenu;