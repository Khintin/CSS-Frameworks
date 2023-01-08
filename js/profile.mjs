import { clearToken } from "./localstorage.mjs";
import { getToken } from "./localstorage.mjs";

const btnLogout = document.querySelector("#btnLogOut");

const token = getToken();

if (!token) {
    location.href = "login.html";
}

btnLogout.addEventListener("click", logOut)

function logOut() {
    clearToken();
    location.href = "login.html";
}

