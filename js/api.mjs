import { getToken, getUser } from "./localstorage.mjs";

const baseUrl = "https://api.noroff.dev/api/v1/social";


export async function registerUser(username, email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        "name": username,
        "email": email,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    return fetch(baseUrl + "/auth/register", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

export async function loginUser(email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        "email": email,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    return fetch(baseUrl + "/auth/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

export async function getPosts() {
    const token = getToken();

    if (!token) {
        throw new Error("The user is not logged in. Unauthorized.")
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(baseUrl + "/posts/?sort=created&sortOrder=desc", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

export async function getPostById(postId) {
    const token = getToken();

    if (!token) {
        throw new Error("The user is not logged in. Unauthorized.")
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(baseUrl + "/posts/" + postId + "?_author=true", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

export async function createPost(title, body) {
    const token = getToken();

    if (!token) {
        throw new Error("The user is not logged in. Unauthorized.")
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            title: title, // Required
            body: body, // Optional
        })
    };

    return fetch(baseUrl + "/posts/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

export async function deletePost(postId) {
    const token = getToken();

    if (!token) {
        throw new Error("The user is not logged in. Unauthorized.")
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders
    };

    return fetch(baseUrl + "/posts/" + postId, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

export async function updatePost(postId, title, body) {
    const token = getToken();

    if (!token) {
        throw new Error("The user is not logged in. Unauthorized.")
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ title: title, body: body })
    };

    return fetch(baseUrl + "/posts/" + postId + "?_author=true", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}