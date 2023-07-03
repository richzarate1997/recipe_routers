import axios from 'axios';
import { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";
import jwtDecode from 'jwt-decode'
import { json } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:8080'

const API_URL = `${BASE_URL}/api/user`;

export async function findUser() {
    const { app_user_id: id} = jwtDecode(localStorage.getItem('jwt_token'))
    try {
        const options = {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
        }
        const response = await axios.post(API_URL, { id: id }, options);
        if (response.status === 200) {
            console.log(response)
            return response.data;
        } else {
            return Promise.reject(`User: ${id} was not found.`);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}


// export async function update() {
// }