import { BACKEND_ADDRESS, PASSWORD_SALT } from "./config";
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
        BACKEND_ADDRESS;
        window.location.href = "order_list.html";
    }

    async function sendSignupRequest(username: string, hashedPassword: string) {
        // TODO: fetch();
        BACKEND_ADDRESS;
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