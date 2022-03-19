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

export { isUserLoggedIn, setUserLoggedIn, getHeaders };