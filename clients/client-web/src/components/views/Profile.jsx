import { useState, useContext, useEffect } from 'react';
import ProfileCard from '../ProfileCard';
import AuthContext from '../../contexts/AuthContext';
import { findUser } from '../../service/userApi';

const Profile = () => {
    const [userProps, setUserProps] = useState({});
    
    const auth = useContext(AuthContext);
    useEffect(() => {
        findUser()
            .then(data => {
                setUserProps(data);
                auth.userProps = {...data};
            })
            .catch(err => console.log(err));
        console.log(userProps)
    }, []);
    
    return (
        <>
            <ProfileCard 
                // name={}
            />
        </>
    )
}

export default Profile