import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`)
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Grid container pt={2} justifyContent='center'>
        <Grid item lg={8} md={9} sm={10} xs={12}>
          <TextField
            fullWidth
            focused
            id='search-bar'
            onChange={handleChange}
            value={searchQuery}
            label='Search for a recipe'
            variant='outlined'
            placeholder='example: hamburger'
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton type='submit' aria-label='search'>
                    <SearchIcon sx={{ fill: '#7CA65A' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchBar;