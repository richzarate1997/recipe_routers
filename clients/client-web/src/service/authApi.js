const url = 'http://localhost:8080';

export async function authenticate(credentials) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    };

    const response = await fetch(`${url}/authenticate`, init);
    if (response.status === 200){
        const data = await response.json();
        return makeUser(data);
    } else {
        return Promise.reject('Bad credentials');
    }
}

export async function refreshToken() {
    const jwtToken = localStorage.getItem('jwt_token');

    const init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    };

    const response = await fetch(`${url}/refresh-token`, init);

    if(response.status === 200){
        const data = await response.json();
        return makeUser(data);
    } else {
        signOut();
        return Promise.reject('Session expired');
    }
}

export function signOut() {
    localStorage.removeItem('jwt_token');
}

const makeUser = (authResponse) => {
    const jwtToken = authResponse.jwt_token;
    localStorage.setItem('jwt_token', jwtToken);
    return makeUserFromJwt(jwtToken);
};

const makeUserFromJwt = (jwtToken) => {
    const tokenParts = jwtToken.split('.');
    if(tokenParts.length > 1){
        const userData = tokenParts[1];
        const decodedUserData = JSON.parse(atob(userData));
        return {
            appUserId: decodedUserData.app_user_id,
            username: decodedUserData.sub,
            roles: decodedUserData.authorities.split(',')
        }
    }
};