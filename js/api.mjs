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

/**
 * Gets a post from the API using the provided post ID
 * @param {number} postId a number to indicate which post to get
 * @returns {any} a JSON object of the post, or false if the API call failed.
 */

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

/**
 * Deleting an existing post that match to the post ID
 * @param {number} postId a number indicate which post to delete
 * @returns {boolean} True if the API call succeeded, otherwise false.
 */
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
            return true;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });
}

/**
 * Updates an existing post with the provided title and body
 * @param {number} postId A number indicating which post to update
 * @param {string} title The new title of the post
 * @param {string} body The new content of the post
 * @returns {any} a JSON object of the updated post or the error if the API call failed
 */
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
            return error;
        });
}