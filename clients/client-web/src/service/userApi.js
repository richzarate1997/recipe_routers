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
        return Promise.reject(error);
    }
}


// export async function update() {
// }