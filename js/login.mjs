import { loginUser } from "./api.mjs";
import { getUser, setToken, setUser } from "./localstorage.mjs";


const baseUrlRegister = "https://api.noroff.dev/api/v1";

const btnLogin = document.querySelector("#btnLogin");

const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

btnLogin.addEventListener("click", () => {
    // const usernamePattern = /^([a-zA-Z0-9_]+)/;
    // const usernameValid = usernamePattern.test(username);

    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPassword").value;

    const emailPattern = /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@(?:stud\.noroff\.no|noroff\.no)$/;
    const emailValid = emailPattern.test(email);




    let error = false;
    resetErrors();

    if (!emailValid || email.length < 12) {
        showErrorMessage("email", "Email must be at least 12 characters long and use @noroff.no or @stud.noroff.no");
        error = true;
    }

    if (password.length < 8) {
        showErrorMessage("password", "Password must be at least 8 characters");
        error = true;
    }

    if (!error) {
        loginUser(email, password).then((res) => {
            if (!res || res.errors) {
                console.log("Something went wrong");
                return;
            }

            const { accessToken, name, email, ...profile } = res;

            setToken(accessToken);
            setUser(name, email);
            location.href = "profile.html";
        });
    }
});

function showErrorMessage(errorType, text) {
    if (errorType == "email") {
        emailError.innerText = text;
    }
    else if (errorType == "password") {
        passwordError.innerText = text;
    }
}

function resetErrors() {
    emailError.innerText = "";
    passwordError.innerText = "";
}