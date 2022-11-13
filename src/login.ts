import { BACKEND_ADDRESS, PASSWORD_SALT } from "./config";
import { checkToken } from "./util";
import SHA256 from "crypto-js/sha256";

namespace loginPage {

    const userNameInput = document.getElementById("username-input") as HTMLInputElement;
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const loginButton = document.getElementById("login-button") as HTMLButtonElement;

    async function sendLoginRequest(username: string, hashedPassword: string) {
        // fetch();
        BACKEND_ADDRESS;
        window.location.href = "order_list.html";
    }

    function calcPasswordHash(password: string, salt: string): string {
        return SHA256(password + salt).toString();
    }

    checkToken(window, () => { window.location.href = "order_list.html" }, () => { });

    loginButton.addEventListener("click", () => {
        let userName = userNameInput.value;
        let password = passwordInput.value;
        let hashedPassword = calcPasswordHash(password, PASSWORD_SALT);

        sendLoginRequest(userName, hashedPassword);
    });
}