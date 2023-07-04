import axios from 'axios';
import jwtDecode from 'jwt-decode'

const BASE_URL = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:8080'

const API_URL = `${BASE_URL}/api/user`;

export async function findUser() {
    const jwtToken = localStorage.getItem('jwt_token');
    const { app_user_id: id } = jwtDecode(jwtToken)
    try {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            },
        }
        const response = await axios.get(`${API_URL}/${id}`, options);
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(`User: ${id} was not found.`);
        }
    } catch (error) {
        console.error(error);
    }
}


export async function update(userProps) {
    const jwtToken = localStorage.getItem('jwt_token');
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            },
        }
        // const data = {
        //     id: userProps.id,
        //     displayName: userProps.displayName,
        //     isMetric: userProps.isMetric
        // }
        const response = await axios.put(`${API_URL}`, userProps, options);
        if (response.status === 204) {
            return;
        } else {
            return Promise.reject(`User: ${userProps.id} was not found.`);
        }
    } catch (error) {
        console.error(error);
    }
}