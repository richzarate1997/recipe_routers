
import { findIngredientByName } from "../service/ingredientApi";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import { Box, Button, InputBase, Grid, Autocomplete } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

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

const IngredientSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        if (searchQuery !== '') {
            findIngredientByName(searchQuery)
                .then(data => {
                    setSearchResults(data);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (event, newValue) => {
        setSearchQuery(newValue);
    };

    const handleSelect = (event, newValue) => {
        setSelectedIngredients(prevIngredients => [...prevIngredients, newValue]);
        setSearchQuery('');
    };

    const fetchIngredients = () => {
        findIngredientByName(searchQuery)
            .then(data => {
                console.log(data);
            })
            .catch(error => {

                console.error(error);
            });
    };


    return (
        <Box m={1} sx={{ display: 'flex' }} component='form' onSubmit={fetchIngredients}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                {/* <Autocomplete
                freeSolo
                options={searchResults}
                getOptionLabel={(option) => option.name} */}
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearch}
                // />
                />
            </Search>
            <Button type='submit' variant="contained" color="secondary" sx={{ mr: 2 }}>
                Search
            </Button>
        </Box>
    );
}

export default IngredientSearch;
