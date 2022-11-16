import { BACKEND_ADDRESS, ORDER_ADDRESS, ORDER_TABLE_CUSTOM_ELEMENTS, ORDER_TABLE_KEYS } from "./config";
import { Order } from "./datatypes";
import { checkToken, EMPTY_TOKEN, PageInfo, ParsedToken, parseToken, regPageFlip, updateBanner, updateTable } from "./util";

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

    var token: string = "";  // TODO
    var tokenObj: ParsedToken = EMPTY_TOKEN;
    var pageInfo: PageInfo = new PageInfo();
    var checkedNumber = 0;
    var checkboxElements: HTMLInputElement[] = [];
    var orderList: Order[];

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

    function queryOrderedList(page: number, filter: string, table: HTMLTableElement, keys: string[], rowCallback: CallableFunction = () => { }) {
        let postfix: string;
        if (filter == null || filter == "" || filter == undefined)
            postfix = `?token=${token}&page=${page}`;
        else
            postfix = `?token=${token}&page=${page}&filter=${filter}`;

        // query ordered list
        fetch(ORDER_ADDRESS + postfix, {
            method: "GET"
        })
            .then((value: Response) => value.json())
            .then((data) => {
                console.log("Query order Success:", data);
                // TODO
                let value: object[] = [];
                orderPageNumberInput.value = String(page);
                pageInfo.pageNumberMax = 10; // TODO
                // then update table
                // and store all select inputs to []
                checkboxElements = []; // monkey patch 
                updateTable(table, keys, value, ORDER_TABLE_CUSTOM_ELEMENTS, rowCallback);
            })
            .catch((error) => {
                console.error("Query order Error:", error);
            });
    }

    function sendDeleteRequest(order: Order) { // unbook
        var deleteInfo = {
            "token": token,
            "oid": order.oid,
            "tid": order.ticket.tid,
        };
        // query ordered list
        fetch(ORDER_ADDRESS, {
            method: "DELETE"
        })
            .then((value: Response) => value.json())
            .then((data) => {
                console.log("Delete Success:", data);
                // TODO
                window.location.reload();
            })
            .catch((error) => {
                console.error("Delete Error:", error);
            });
    }

    checkToken(window, (to: string) => token = to);
    window.addEventListener("load", () => {
        if (token == "") {
            // TODO
            tokenObj = parseToken("");

            updateBanner(userIdBlank, userNameBlank, expirationTimeBlank, tokenObj.userId, tokenObj.userName, tokenObj.expirationDate);

            queryOrderedList(pageInfo.pageNumber, "", orderTable, ORDER_TABLE_KEYS, orderRowCallback);
            // query ordered list
            // then update table
            // and store all select inputs to []
        }
    });

    // TODO: add listener
    newTransactionButtonTop.addEventListener("click", (ev: Event) => {
        window.location.href = "transaction.html";
    });

    deleteButton.addEventListener("click", (ev: Event) => {
        if (tokenObj == EMPTY_TOKEN) return;
        for (let index = 0; index < checkboxElements.length; index++) {
            if (checkboxElements[index].checked) {
                // TODO
                sendDeleteRequest(orderList[index]);
            }
        }
    });

    regPageFlip(
        orderPageNumberInput,
        previousOrderPageButton,
        nextOrderPageButton,
        pageInfo,
        (currentPage: number, nextPage: number) => {
            if (tokenObj != EMPTY_TOKEN && currentPage != nextPage)
                queryOrderedList(nextPage, " ", orderTable, ORDER_TABLE_KEYS, orderRowCallback);
        });
}