

export function isTokenSet() {
    if (token)
        return true;
    else
        return false;
}

export function clearToken() {
    localStorage.clear();
}

export function getToken() {
    return localStorage.getItem("auth");
}

export function setToken(token) {
    localStorage.setItem("auth", token);
}

export function getUser() {
    const user = localStorage.getItem("user");

    if (user) {
        return JSON.parse(user);
    }
    else {
        return null;
    }
}

export function setUser(username, email) {
    localStorage.setItem("user", JSON.stringify({ username: username, email: email }));
}