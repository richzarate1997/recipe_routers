import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const NavBarSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchQuery}`)
    };
    return (
        <Box m={1} component={'form'} onSubmit={handleSubmit}>
        <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    
                    onChange={handleChange}
                    value={searchQuery}
                    label="Search for a recipe"
                />
            </Search>
        </Box>
    )
}

export default NavBarSearch
