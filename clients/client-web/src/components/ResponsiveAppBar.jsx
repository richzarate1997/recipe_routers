import {
  AppBar, Box, Button, Container,
  createTheme, IconButton,
  Menu, MenuItem, ThemeProvider,
  Toolbar, Tooltip, Typography
} from '@mui/material/';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserIcon from './UserIcon';
import NavBarSearch from './NavBarSearch';
import AuthContext from '../contexts/AuthContext';

const pages = ['Home', 'Recipes', 'About'];

function ResponsiveAppBar() {
  const [anchorNav, setAnchorNav] = useState(null);
  const location = useLocation();
  const auth = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#D1483D',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='sticky'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <FastfoodOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6' noWrap
              component={Link} to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >GetYum</Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <Tooltip title='Expand Navigation' >
                  <LunchDiningOutlinedIcon />
                </Tooltip>
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <Box sx={{ position: 'top' }}>
                  {pages.map((page) => (
                    <MenuItem key={page} value={page} onClick={handleCloseNavMenu} >
                      <Typography
                        textAlign='center'
                        to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                        component={Link}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                  {!auth.isLoggedIn() && location.pathname !== '/login' &&
                    <MenuItem value='Login' onClick={handleCloseNavMenu} >
                      <Typography
                        textAlign='center'
                        to='/login'
                        component={Link}>
                        Login
                      </Typography>
                    </MenuItem>
                  }
                </Box>
              </Menu>
            </Box>
            <FastfoodOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5' noWrap
              component={Link} to='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GetYum
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                >
                  {page}
                </Button>
              ))}
              {!auth.user.username && location.pathname !== '/login' &&
                <Button
                  to={'/login'}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                >
                  Login
                </Button>
              }
            </Box>
            { location.pathname !== '/' && <NavBarSearch /> }
            { auth.isLoggedIn() && <UserIcon /> }
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;