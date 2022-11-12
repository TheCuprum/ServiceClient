import { BACKEND_ADDRESS, PASSWORD_SALT } from "./config";

namespace loginPage {
    
    const userNameInput = document.getElementById("username-input") as HTMLInputElement;
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const loginButton = document.getElementById("login-button") as HTMLButtonElement;

    async function sendLoginRequest(username: string, hashedPassword: string) {
        // fetch();
        BACKEND_ADDRESS;
        window.location.href = "order_list.html";
    }

    function calcPasswordHash(password: string, salt: number): string {

        return "null";
    }

    loginButton.addEventListener("click", () => {
        let userName = userNameInput.value;
        let password = passwordInput.value;
        let hashedPassword = calcPasswordHash(password, PASSWORD_SALT);

        sendLoginRequest(userName, hashedPassword);
    });
}