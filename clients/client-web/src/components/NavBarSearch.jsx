
// import SearchIcon from '@mui/icons-material/Search';
// import { Box, InputBase } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(1),
//         width: 'auto',
//     },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             width: '12ch',
//             '&:focus': {
//                 width: '20ch',
//             },
//         },
//     },
// }));

// const NavBarSearch = () => {
//     return (
//         < Box m={1}>
//             <Search>
//                 <SearchIconWrapper>
//                     <SearchIcon />
//                 </SearchIconWrapper>
//                 <StyledInputBase
//                     placeholder="Search…"
//                     inputProps={{ 'aria-label': 'search' }}
//                 />
//             </Search>
//         </Box>
//     )
// }

// export default NavBarSearch


import { findIngredientByName } from "../service/ingredientApi";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

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

const NavBarSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchIngredients();
        }
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
        <Box m={1}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyPress={handleKeyPress}
                />
            </Search>
        </Box>
    );
}

export default NavBarSearch;
