import { registerUser, loginUser } from "./api.mjs";
import { setToken, setUser } from "./localstorage.mjs";


const baseUrlRegister = "https://api.noroff.dev/api/v1";

const btnRegister = document.querySelector("#btnRegister");

btnRegister.addEventListener("click", () => {

    const username = document.querySelector("#inputUsername").value;
    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPassword").value;
    const passwordRepeat = document.querySelector("#inputPasswordRepeat").value;

    const usernamePattern = /^([a-zA-Z0-9_]+)/;
    const usernameValid = usernamePattern.test(username);

    const emailPattern = /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@(?:stud\.noroff\.no|noroff\.no)$/;
    const emailValid = emailPattern.test(email);


    let error = false;

    if (!usernameValid || username.length < 3) {
        alert("Username must be at least 3 characters long");
        error = true;
    }

    if (!emailValid || email.length < 12) {
        alert("Email must be at least 12 characters long and use @noroff.no or @stud.noroff.no");
        error = true;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 charcters");
        error = true;
    }

    if (passwordRepeat != password) {
        alert("The passwords don't match");
        error = true;
    }

    if (!error) {
        console.log(username, email, password);
        registerUser(username, email, password).then((res) => {
            if (!res || res.errors) {
                console.log("Something went wrong");
                return;
            }

            loginUser(email, password).then((res) => {
                if (!res || res.errors) {
                    console.log("Unable to login");
                    return;
                }

                setToken(res.accessToken);
                setUser(res.name, res.email);

                location.href = "/profile.html";
            });
        });
    }

});
