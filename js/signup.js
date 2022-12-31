const baseUrlRegister = "http://api.noroff.dev/api/v1";
const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
    },
}
const response = await fetch(`${API_BASE_URL}/api/v1/social/register`, options)
const data = await response.json()

fetch('http://api.noroff.dev/api/v1/social/auth/register', {
    method: 'POST',
    body: JSON.stringify({
        "name": "andrea_claire",
        "email": "andrea.claire@stud.noroff.no",
        "password": "peace20",
        "repeat password": "peace20",
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

