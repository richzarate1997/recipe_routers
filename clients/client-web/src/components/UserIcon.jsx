import { useContext, useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const UserIcon = () => {
    const [anchorUser, setAnchorUser] = useState(null);
    const auth = useContext(AuthContext);

    const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    // Some borrowed code from mui 
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
    }

    function stringAvatar(name) {
        const initials = name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : name[0];
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: initials === undefined ? null : initials,
        };
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar { ...stringAvatar(`${auth.userProps.displayName}`) } />
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
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" to={`/profile`} component={Link}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => auth.signOut()} component={Link}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default UserIcon