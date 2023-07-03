import { useState, useContext, useEffect } from 'react';
import ProfileCard from '../ProfileCard';
import AuthContext from '../../contexts/AuthContext';
import { findUser } from '../../service/userApi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userProps, setUserProps] = useState({});
    
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        findUser()
            .then(data => {
                setUserProps(data);
                auth.userProps = {...data};
            })
            .catch(err => console.log(err));
    }, []);
    
    useEffect(() => {
        if (!auth.isLoggedIn()) {
            navigate('/');
        }
    }, [auth]);
    
    return (
        <>
            <ProfileCard 
                // imgUrl={}
                name={userProps.displayName}
            />
        </>
    )
}

export default Profile