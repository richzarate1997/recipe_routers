import {
    AppBar, Avatar, Box, Button, Container,
    createTheme, IconButton, InputBase,
    Menu, MenuItem, ThemeProvider, Toolbar,
    Tooltip, Typography
} from '@mui/material/';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { styled, alpha } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const pages = ['Home', 'Recipes', 'About'];
const settings = ['Profile', 'Login'];

function ResponsiveAppBar() {
    const [anchorNav, setAnchorNav] = useState(null);
    const [anchorUser, setAnchorUser] = useState(null);

    const auth = useContext(AuthContext);

    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);

    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);

    };

    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#D1483D',
            },
        },
    });

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FastfoodOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GetYum
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <LunchDiningOutlinedIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <Box sx={{
                                    position: 'top'
                                }}>
                                    {pages.map((page) => (
                                        <MenuItem key={page} value={page} onClick={handleCloseNavMenu} >
                                            <Typography textAlign="center" to={`/${page}`} component={Link}>{page}</Typography>
                                        </MenuItem>
                                    ))}
                                    {!auth.user.username &&
                                        <MenuItem value='Login' onClick={handleCloseNavMenu} >
                                            <Typography textAlign="center" to={'login'} component={Link}>Login</Typography>
                                        </MenuItem>
                                    }
                                </Box>
                            </Menu>
                        </Box>
                        <FastfoodOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
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
                                    to={`/${page}`}
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    component={Link}
                                >
                                    {page}
                                </Button>
                            ))}
                            {!auth.user.username &&
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
                        <Box m={1}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Box>
                        {/* {auth.isLoggedIn() && */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" to={`/${setting}`} component={Link}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* } */}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>

    );
}

export default ResponsiveAppBar;
