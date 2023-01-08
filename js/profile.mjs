import { clearToken } from "./localstorage.mjs";

const btnLogout = document.querySelector("#btnLogOut");

btnLogout.addEventListener("click", logOut)

function logOut() {
    clearToken();
    location.href = "login.html";
}