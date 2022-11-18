import { BOOK_ADDRESS, TICKET_TABLE_CUSTOM_ELEMENTS, TICKET_TABLE_KEYS } from "./config";
import { Ticket, TicketEntry, TicketEntryFlat } from "./datatypes";
import { checkToken, PageInfo, regPageFlip, removeAllChildren, updateBanner, updateTable } from "./util";

namespace transactionPage {

    const tokenBlank = document.getElementById("token-blank") as HTMLDivElement;
    // const userIdBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    // const userNameBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    // const expirationTimeBlank = document.getElementById("expiration-date-blank") as HTMLDivElement;

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
        if (row != null && row.childNodes[0] instanceof HTMLInputElement) {
            let radElement = row.childNodes[0] as HTMLInputElement;
            if (radElement.type == "radio") {
                radioElements.push(radElement);
                radElement.addEventListener("click", (ev: Event) => {
                    selectedTicket = entryList[rowNum].ticket;
                    // TODO
                });
            }
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
                    window.alert(data);
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
        fetch(BOOK_ADDRESS, {
            method: "POST"
        })
            .then((value: Response) => value.json())
            .then((data) => {
                console.log("Book response:", data);
                if (data["code"] == 0) {
                    ;
                } else {
                    console.error(data);
                    window.alert(data);
                }
                window.location.reload();
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
            selectedTicket = EMPTY_OBJECT;
        });
    });
}