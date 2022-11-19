import { BOOK_ADDRESS, ORDER_ADDRESS, ORDER_PAGE, TICKET_TABLE_CUSTOM_ELEMENTS, TICKET_TABLE_KEYS } from "./config";
import { Ticket, TicketEntry, TicketEntryFlat } from "./datatypes";
import { checkToken, PageInfo, regPageFlip, removeAllChildren, resetToken, updateBanner, updateTable } from "./util";

namespace transactionPage {

    const tokenBlank = document.getElementById("token-blank") as HTMLDivElement;
    // const userIdBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    // const userNameBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    // const expirationTimeBlank = document.getElementById("expiration-date-blank") as HTMLDivElement;

    const backButton = document.getElementById("back-button") as HTMLButtonElement;
    const ticketTable = document.getElementById("ticket-table") as HTMLTableElement;

    const previousTransPageButton = document.getElementById("previous-trans-page-button") as HTMLButtonElement;
    const nextTransPageButton = document.getElementById("next-trans-page-button") as HTMLButtonElement;
    const transPageNumberInput = document.getElementById("trans-page-number") as HTMLInputElement;

    const chooseButton = document.getElementById("choose-button") as HTMLButtonElement;
    const confirmButton = document.getElementById("confirm-button") as HTMLButtonElement;
    const discardButton = document.getElementById("discard-button") as HTMLButtonElement;
    const paymentMsgDiv = document.getElementById("payment-msg-div") as HTMLDivElement;

    const EMPTY_OBJECT = new Ticket();

    var token: string = "";
    // var tokenObj: ParsedToken = EMPTY_TOKEN;
    var pageInfo: PageInfo = new PageInfo();
    var entryList: TicketEntry[] = [];
    var radioElements: HTMLInputElement[] = [];
    var selectedTicket: Ticket = EMPTY_OBJECT;


    const ticketRowCallback = (rowNum: number, row: HTMLTableRowElement, table: HTMLTableElement) => {
        if (row != null && row.childNodes[0].childNodes[0] instanceof HTMLInputElement) {
            let radElement = row.childNodes[0].childNodes[0] as HTMLInputElement;
            if (radElement.type == "radio") {
                radioElements.push(radElement);
                radElement.addEventListener("change", (ev: Event) => {
                    // radElement.addEventListener("click", (ev: Event) => {
                        selectedTicket = entryList[rowNum - 1].ticket;
                        console.log(2, selectedTicket);
                        // TODO
                    });
                }
            }
        if (row != null && row.childNodes[6].childNodes[0] instanceof Text) {
            let txtNode = row.childNodes[6].childNodes[0] as Text;
            if (txtNode.textContent != null)
                txtNode.data = "￥ " + txtNode.data;
        }

    };

    function queryTicketList(page: number, filter: string, table: HTMLTableElement, keys: string[], rowCallback: CallableFunction = () => { }) {
        let postfix: string;
        if (filter == null || filter == "" || filter == undefined)
            postfix = `?token=${token}&page=${page}`;
        else
            postfix = `?token=${token}&page=${page}&filter=${filter}`;

        // query ordered list
        fetch(BOOK_ADDRESS + postfix, {
            method: "GET"
            // query ticket list
        })
            .then((value: Response) => value.json())
            .then((data) => {
                console.log("Query ticket response:", data);
                if (data["code"] == 0) {
                    transPageNumberInput.value = String(page);

                    entryList = data["entries"] as TicketEntry[];
                    let entryListFlat: TicketEntryFlat[] = [];
                    for (let index = 0; index < entryList.length; index++)
                        entryListFlat.push(new TicketEntryFlat(entryList[index]))

                    pageInfo.pageNumberMax = entryList.length;
                    radioElements = []; // monkey patch 
                    // then update table
                    updateTable(table, keys, entryListFlat, TICKET_TABLE_CUSTOM_ELEMENTS, rowCallback);
                    // and store all radio inputs to []
                } else {
                    console.error(data);
                    window.alert(JSON.stringify(data));
                    if (data["code"] == "-300") resetToken();
                }
            })
            .catch((error) => {
                console.error("Query ticket Error:", error);
            });
    }

    function updatePaymentMsg(paymentMsgDiv: HTMLDivElement, msg: Node) {
        removeAllChildren(paymentMsgDiv);
        paymentMsgDiv.append(msg);
    }

    function sendTicketRequest(ticket: Ticket) {
        var bookInfo = {
            "token": token,
            "tid": ticket.tid,
            "timestamp": Date.now(),
        };
        // query ordered list
        fetch(ORDER_ADDRESS, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "text/plain",
            },
            // mode: "no-cors",
            body: JSON.stringify(bookInfo),
        })
            .then((value: Response) => value.json())
            .then((data) => {
                console.log("Book response:", data);
                if (data["code"] == 0) {
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
                console.error("Book Error:", error);
            });
    }


    checkToken(window, (to: string) => token = to);
    window.addEventListener("load", () => {
        if (token != "") {
            updateBanner(tokenBlank, token);
            // updateBanner(userIdBlank, userNameBlank, expirationTimeBlank, tokenObj.userId, tokenObj.userName, tokenObj.expirationDate);
            queryTicketList(pageInfo.pageNumber, "", ticketTable, TICKET_TABLE_KEYS, ticketRowCallback);
        }

        regPageFlip(
            transPageNumberInput,
            previousTransPageButton,
            nextTransPageButton,
            pageInfo,
            (currentPage: number, nextPage: number) => {
                if (token != "" && currentPage != nextPage)
                    queryTicketList(pageInfo.pageNumber, "", ticketTable, TICKET_TABLE_KEYS, ticketRowCallback);
            });

        chooseButton.addEventListener("click", (ev: Event) => {
            console.log(selectedTicket);

            if (token != "" && selectedTicket != EMPTY_OBJECT) {
                paymentMsgDiv.hidden = false;
                confirmButton.hidden = false;
                discardButton.hidden = false;

                updatePaymentMsg(paymentMsgDiv, document.createTextNode("PLACEHOLDER"));
            }
        });

        confirmButton.addEventListener("click", (ev: Event) => {
            if (token != "" && selectedTicket != EMPTY_OBJECT) {
                // TODO
                sendTicketRequest(selectedTicket);
            }
        });

        discardButton.addEventListener("click", (ev: Event) => {
            paymentMsgDiv.hidden = true;
            confirmButton.hidden = true;
            discardButton.hidden = true;
            // selectedTicket = EMPTY_OBJECT;
        });
        backButton.addEventListener("click", () => {
            window.location.href = ORDER_PAGE;
        });
    });
}