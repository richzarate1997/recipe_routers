import axios from 'axios';
import { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";
import jwtDecode from 'jwt-decode'

const BASE_URL = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:8080'

const API_URL = `${BASE_URL}/api/user`;

const auth = useContext(AuthContext);

export async function findUser() {
    const { app_user_id: userId } = jwtDecode(auth.user.token)
    try {
        const options = {
            method: 'GET',
            url: API_URL,
            headers: {
                authorization: `Bearer ${auth.user.token}`,
            },
            body: {
                id: userId
            }
        }
        const response = await axios.get(options);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(`User: ${userId} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
} 
