import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2196f3' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agile Aprons
                </Typography>
                <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
                    Create a Recipe
                </Button>
                <Button variant="contained" color="secondary">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
