import Cookies from "js-cookie";
import { BACKEND_ADDRESS, ORDER_PAGE } from "./config";
import { checkToken } from "./util";

namespace index {
    // console.log("Hello World!");
    const welcomeHeading = document.getElementById("welcome-heading") as HTMLHeadingElement;
    const continueButton = document.getElementById("continue-button") as HTMLButtonElement;
    const backendInput = document.getElementById("backend-input") as HTMLInputElement;

    window.addEventListener("load", () => {
        welcomeHeading.addEventListener("click", (ev) => {
            if (backendInput.value != "")
                window.open(backendInput.value);
            else
                window.open(BACKEND_ADDRESS);

        })
        continueButton.addEventListener("click", (ev: MouseEvent) => {
            if (backendInput.value != "") {
                Cookies.set("backend", backendInput.value);
            }
            window.location.href = ORDER_PAGE;
        })
    });
}