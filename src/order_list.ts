import { BACKEND_ADDRESS, ORDER_TABLE_KEYS } from "./config";
import { checkToken, PageInfo, parseToken, regPageFlip, updateBanner } from "./util";

namespace orderListPage {

    const userIdBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    const userNameBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    const expirationTimeBlank = document.getElementById("expiration-date-blank") as HTMLDivElement;

    const orderTable = document.getElementById("order-table") as HTMLTableElement;
    const newTransactionButtonTop = document.getElementById("new-trans-button-top") as HTMLButtonElement;
    // const newTransactionButtonDown = null;
    const deleteButton = document.getElementById("del-button") as HTMLButtonElement;

    const previousOrderPageButton = document.getElementById("previous-order-page-button") as HTMLButtonElement;
    const nextOrderPageButton = document.getElementById("next-order-page-button") as HTMLButtonElement;
    const orderPageNumberInput = document.getElementById("order-page-number") as HTMLInputElement;

    var pageInfo: PageInfo = new PageInfo();
    var checkedNumber = 0;
    var checkboxElements: HTMLInputElement[] = [];

    const orderRowCallback = (row: HTMLTableRowElement, table: HTMLTableElement) => {
        if (typeof (row.childNodes[0], HTMLInputElement)) {
            let chElement = row.childNodes[0] as HTMLInputElement;
            if (chElement.type == "checkbox") {
                checkboxElements.push(chElement);
                chElement.addEventListener("click", (ev: Event) => {
                    var e = ev.target as HTMLInputElement;
                    if (e.checked)
                        checkedNumber++;
                    else
                        checkedNumber--;

                    if (checkedNumber > 0)
                        deleteButton.hidden = false;
                    else
                        deleteButton.hidden = true
                });
            }
        }
    }

    function queryOrderedList(page: number, table: HTMLTableElement, keys: string[], rowCallback: CallableFunction = () => { }) {
        // query ordered list
        // then update table
        // and store all select inputs to []
        BACKEND_ADDRESS;
        orderPageNumberInput.value = String(page);
        pageInfo.pageNumberMax = 10; // TODO
        checkboxElements = []; // monkey patch 
    }

    checkToken(window);
    // TODO
    var tokenObj = parseToken("");
    updateBanner(userIdBlank, userNameBlank, expirationTimeBlank, tokenObj.userId, tokenObj.userName, tokenObj.expirationDate);

    queryOrderedList(pageInfo.pageNumber, orderTable, ORDER_TABLE_KEYS, orderRowCallback);
    // query ordered list
    // then update table
    // and store all select inputs to []

    // TODO: add listener
    newTransactionButtonTop.addEventListener("click", (ev: Event) => { });
    deleteButton.addEventListener("click", (ev: Event) => { });

    regPageFlip(
        orderPageNumberInput,
        previousOrderPageButton,
        nextOrderPageButton,
        pageInfo,
        (currentPage: number, nextPage: number) => {
            queryOrderedList(nextPage, orderTable, ORDER_TABLE_KEYS, orderRowCallback);
        });
}