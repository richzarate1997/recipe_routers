import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { findUser } from '../../service/userApi';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

const Profile = () => {
    const [userProps, setUserProps] = useState({});
    const [disabled, setDisabled] = useState(true);
    
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleDisplayNameFieldDisable = () => {
        setDisabled(!disabled);
    }
    
    const handleUserSettingsUpdate = () => {
        
    }
    
    const handleChange = (e) => {
            const nextUserProps = { ...userProps };
            if (e.target.type === 'checkbox') {
                nextUserProps[e.target.name] = e.target.checked;
            } else {
                nextUserProps[e.target.name] = e.target.value;
            }
            setUserProps(nextUserProps);
    };
    
    useEffect(() => {
        findUser()
            .then(data => {
                setUserProps(data);
                auth.userProps = {...data};
            })
            .catch(err => console.log(err));
    }, [auth]);
    
    return (
        <Box mx={4} sx={{paddingTop: 2}} component="form" onSubmit={handleUserSettingsUpdate}>
            <TextField disabled={disabled} 
                label="Display Name"
                id="displayName"
                variant='outlined'
                defaultValue={userProps.displayName}
                onClick={ () => disabled ? handleDisplayNameFieldDisable : handleUserSettingsUpdate }
                onChange={handleChange}
            />
        </Box>
    )
}

export default Profile