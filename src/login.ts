import { ACCOUNT_ADDRESS, PASSWORD_SALT } from "./config";
import { checkToken } from "./util";
import SHA256 from "crypto-js/sha256";

namespace loginPage {
    const loginHeading = document.getElementById("login-heading") as HTMLHeadingElement;
    const signUpHeading = document.getElementById("sign-up-heading") as HTMLHeadingElement;
    const signUpTableRow = document.getElementById("sign-up-row") as HTMLTableRowElement;

    const userNameInput = document.getElementById("username-input") as HTMLInputElement;
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const comfirmPasswordInput = document.getElementById("confirm-password-input") as HTMLInputElement;
    const loginButton = document.getElementById("login-button") as HTMLButtonElement;
    const signUpButton = document.getElementById("sign-up-button") as HTMLButtonElement;

    async function sendLoginRequest(username: string, hashedPassword: string) {
        // TODO: fetch();
        let loginData = {
            "username": username,
            "hasedPassword": hashedPassword,
        }
        fetch(ACCOUNT_ADDRESS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((value: Response) => value.json())
            // TODO: store cookie
            .then((data) => {
                console.log('Log In Success:', data);
                // window.location.href = "order_list.html";
            })
            .catch((error) => {
                console.error('Log In Error:', error);
            });
    }

    async function sendSignupRequest(username: string, hashedPassword: string) {
        let signUpData = {
            "username": username,
            "hasedPassword": hashedPassword,
        }
        fetch(ACCOUNT_ADDRESS, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData),
        })
            .then((value: Response) => value.json())
            // TODO
            .then((data) => {
                console.log('Sign Up Success:', data);
            })
            .catch((error) => {
                console.error('Sign Up Error:', error);
            });

    }

    function calcPasswordHash(password: string, salt: string): string {
        return SHA256(password + salt).toString();
    }

    checkToken(window, () => { window.location.href = "order_list.html" }, () => { });

    loginButton.addEventListener("click", () => {
        if (!signUpHeading.hidden || !signUpTableRow.hidden) {
            signUpHeading.hidden = true;
            signUpTableRow.hidden = true;
            loginHeading.hidden = false;
        } else {
            let userName = userNameInput.value;
            let password = passwordInput.value;
            if (userName != "" && password != "") {
                let hashedPassword = calcPasswordHash(password, PASSWORD_SALT);
                sendLoginRequest(userName, hashedPassword);
            }
        }
    });

    signUpButton.addEventListener("click", () => {
        if (signUpHeading.hidden || signUpTableRow.hidden) {
            signUpHeading.hidden = false;
            signUpTableRow.hidden = false;
            loginHeading.hidden = true;
        } else {
            let userName = userNameInput.value;
            let password = passwordInput.value;
            let confirmPassword = comfirmPasswordInput.value;
            if (userName != "" && password != "" && password == confirmPassword) {
                let hashedPassword = calcPasswordHash(password, PASSWORD_SALT);
                sendSignupRequest(userName, hashedPassword);
            }
        }
    });
}