import { LOGIN_PAGE, ORDER_ADDRESS, ORDER_TABLE_CUSTOM_ELEMENTS, ORDER_TABLE_KEYS, TICKET_PAGE } from "./config";
import { Order, OrderFlat } from "./datatypes";
import { checkToken, PageInfo, regPageFlip, resetToken, updateBanner, updateTable } from "./util";

namespace orderListPage {

    const tokenBlank = document.getElementById("token-blank") as HTMLDivElement;
    // const userIdBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    // const userNameBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    // const expirationTimeBlank = document.getElementById("expiration-date-blank") as HTMLDivElement;

    const orderTable = document.getElementById("order-table") as HTMLTableElement;
    const newTransactionButtonTop = document.getElementById("new-trans-button-top") as HTMLButtonElement;
    // const newTransactionButtonDown = null;
    const deleteButton = document.getElementById("del-button") as HTMLButtonElement;
    const selectAll = document.getElementById("select-all") as HTMLInputElement;

    const previousOrderPageButton = document.getElementById("previous-order-page-button") as HTMLButtonElement;
    const nextOrderPageButton = document.getElementById("next-order-page-button") as HTMLButtonElement;
    const orderPageNumberInput = document.getElementById("order-page-number") as HTMLInputElement;

    var token: string = "";
    // var tokenObj: ParsedToken = EMPTY_TOKEN;
    var pageInfo: PageInfo = new PageInfo();
    var checkedNumber = 0;
    var checkboxElements: HTMLInputElement[] = [];
    var orderList: Order[];

    const orderRowCallback = (rowNum: number, row: HTMLTableRowElement, table: HTMLTableElement) => {
        if (typeof (row.childNodes[0].childNodes[0], HTMLInputElement)) {
            let chElement = row.childNodes[0].childNodes[0] as HTMLInputElement;
            if (chElement.type == "checkbox") {
                checkboxElements.push(chElement);
                chElement.addEventListener("change", (ev: Event) => {
                    var e = ev.target as HTMLInputElement;
                    if (e.checked)
                        checkedNumber++;
                    else
                        checkedNumber--;

                    if (checkedNumber > 0) {
                        deleteButton.hidden = false;
                        if (checkedNumber >= checkboxElements.length)
                            selectAll.checked = true;
                        else
                            selectAll.checked = false;
                    }
                    else {
                        deleteButton.hidden = true;
                    }
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

        // console.log("Query Order:" + ORDER_ADDRESS + postfix);

        // query ordered list
        fetch(ORDER_ADDRESS + postfix, {
            method: "GET"
        })
            .then((value: Response) => value.json())
            .then((data: { [key: string]: any }) => {
                console.log("Query order response:", data);
                if (data["code"] == 0) {
                    // TODO
                    orderPageNumberInput.value = String(page);
                    orderList = data["orders"];
                    let orderListFlat: OrderFlat[] = [];
                    for (let index = 0; index < orderList.length; index++)
                        orderListFlat.push(new OrderFlat(orderList[index]));

                    pageInfo.pageNumberMax = orderList.length;
                    checkboxElements = []; // monkey patch 
                    checkedNumber = 0;
                    // then update table
                    // and store all select inputs to []
                    updateTable(table, keys, orderListFlat, ORDER_TABLE_CUSTOM_ELEMENTS, rowCallback);
                } else {
                    console.error(data);
                    window.alert(JSON.stringify(data));
                    if (data["code"] == "-300") resetToken();
                }
            })
            .catch((error) => {
                console.error("Query order Error:", error);
            });
    }

    function sendDeleteRequest(order: Order) { // unbook
        var deleteInfo = {
            "token": token,
            "oid": order.oid,
            // "tid": order.ticket.tid,
        };
        // query ordered list
        fetch(ORDER_ADDRESS, {
            method: "PUT",
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "text/plain",
            },
            // mode: "no-cors",
            body: JSON.stringify(deleteInfo),
        })
            .then((value: Response) => value.json())
            .then((data: { [key: string]: any }) => {
                console.log("Delete response:", data);
                if (data["code"] == 0) {
                    // TODO
                    window.location.reload();
                    ;
                } else {
                    console.error(data);
                    window.alert(JSON.stringify(data));
                    if (data["code"] == "-300")
                        resetToken();
                    else
                        window.location.reload();
                }
            })
            .catch((error) => {
                console.error("Delete Error:", error);
            });
    }

    checkToken(window, (to: string) => token = to);
    window.addEventListener("load", () => {
        if (token == "") return;
        updateBanner(tokenBlank, token);
        // updateBanner(userIdBlank, userNameBlank, expirationTimeBlank, tokenObj.userId, tokenObj.userName, tokenObj.expirationDate);
        queryOrderedList(pageInfo.pageNumber, "", orderTable, ORDER_TABLE_KEYS, orderRowCallback);
        // query ordered list
        // then update table
        // and store all select inputs to []
    });

    // add listener
    newTransactionButtonTop.addEventListener("click", (ev: Event) => {
        window.location.href = TICKET_PAGE;
    });

    deleteButton.addEventListener("click", (ev: Event) => {
        if (token == "") return;
        for (let index = 0; index < checkboxElements.length; index++) {
            if (checkboxElements[index].checked) {
                // TODO
                sendDeleteRequest(orderList[index]);
            }
        }
    });

    selectAll.addEventListener("change", (ev: Event) => {
        let tar = ev.target as HTMLInputElement;
        let state = tar.checked; // lock state
        for (let index = 0; index < checkboxElements.length; index++) {
            if (checkboxElements[index].checked != state) {
                checkboxElements[index].click();
                // checkboxElements[index].checked = tar.checked;
            }
        }
        tar.checked = state;
    })

    regPageFlip(
        orderPageNumberInput,
        previousOrderPageButton,
        nextOrderPageButton,
        pageInfo,
        (currentPage: number, nextPage: number) => {
            if (token != "" && currentPage != nextPage)
                queryOrderedList(nextPage, " ", orderTable, ORDER_TABLE_KEYS, orderRowCallback);
        });
}