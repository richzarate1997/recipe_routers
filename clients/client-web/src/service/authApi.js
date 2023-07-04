const url = 'http://localhost:8080';

export async function authenticate(credentials, isRegistration = false) {
    const endpoint = isRegistration ? 'create-account' : 'authenticate';
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    };

    let response = await fetch(`${url}/${endpoint}`, init);
    if (response.status === 200){
        if (isRegistration) {
            response = await fetch(`${url}/authenticate`, init);
            if (response.status !== 200) {
                return Promise.reject('There was a conflict.');
            }
        }
        const data = await response.json();
        return makeUser(data);
    } else {
        return Promise.reject('Bad Credentials.');
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

const makeUser = (authResponse, isRegistration = false) => {
    const jwtToken = authResponse.jwt_token;
    localStorage.setItem('jwt_token', jwtToken);
    return makeUserFromJwt(jwtToken, isRegistration);
};

const makeUserFromJwt = (jwtToken, isRegistration = false) => {
    const tokenParts = jwtToken.split('.');
    if(tokenParts.length > 1){
        const userData = tokenParts[1];
        const decodedUserData = JSON.parse(atob(userData));
        return {
            appUserId: decodedUserData.app_user_id,
            username: decodedUserData.sub,
            roles: decodedUserData.authorities.split(','),
            isRegistration: isRegistration
        }
    }
};