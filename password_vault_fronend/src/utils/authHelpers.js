import API_CLIENT from '../api/axiosClient'

const AUTH_TOKEN_KEY = 'token'

const isUserLoggedIn = () => {
    let token = localStorage.getItem(AUTH_TOKEN_KEY);
    return Boolean(token);
}

const setUserLoggedIn = (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    window.location.href = '/home';
}

const getHeaders = () => {
    return {
        'Authorization': 'Token ' + localStorage.getItem(AUTH_TOKEN_KEY)
    }
}

const setUserLoggedOut = async () => {
    await API_CLIENT.post('logout/', {}, {
        headers: getHeaders()
    });

    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = '/login'
}

const setUserProfile = ({firstName, lastName}) => {
    localStorage.setItem('USER_FIRSTNAME', firstName);
    localStorage.setItem('USER_LASTNAME', lastName);
}

const getUserProfile = () => {
    return {
        firstName: localStorage.getItem('USER_FIRSTNAME'),
        lastName: localStorage.getItem('USER_LASTNAME')
    }
}

export { isUserLoggedIn, setUserLoggedIn, getHeaders, setUserLoggedOut, getUserProfile, setUserProfile, AUTH_TOKEN_KEY };