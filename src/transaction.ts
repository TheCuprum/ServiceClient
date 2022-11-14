import { BACKEND_ADDRESS, TICKET_TABLE_KEYS } from "./config";
import { Ticket } from "./datatypes";
import { checkToken, PageInfo, parseToken, regPageFlip, removeAllChildren, updateBanner } from "./util";

namespace transactionPage {

    const userIdBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    const userNameBlank = document.getElementById("user-id-blank") as HTMLDivElement;
    const expirationTimeBlank = document.getElementById("expiration-date-blank") as HTMLDivElement;

    const ticketTable = document.getElementById("ticket-table") as HTMLTableElement;

    const previousTransPageButton = document.getElementById("previous-trans-page-button") as HTMLButtonElement;
    const nextTransPageButton = document.getElementById("next-trans-page-button") as HTMLButtonElement;
    const transPageNumberInput = document.getElementById("trans-page-number") as HTMLInputElement;

    const chooseButton = document.getElementById("choose-button") as HTMLButtonElement;
    const confirmButton = document.getElementById("confirm-button") as HTMLButtonElement;
    const discardButton = document.getElementById("discard-button") as HTMLButtonElement;
    const paymentMsgDiv = document.getElementById("payment-msg-div") as HTMLDivElement;

    const EMPTY_OBJECT = new Ticket();

    var pageInfo: PageInfo = new PageInfo();
    var radioElements: HTMLInputElement[] = [];
    var selectedTicket: Ticket = EMPTY_OBJECT;


    const ticketRowCallback = (row: HTMLTableRowElement, table: HTMLTableElement) => {
        if (row != null && row.childNodes[0] instanceof HTMLInputElement) {
            let radElement = row.childNodes[0] as HTMLInputElement;
            if (radElement.type == "radio") {
                radioElements.push(radElement);
                radElement.addEventListener("click", (ev: Event) => {
                    selectedTicket = new Ticket();
                    // TODO
                });
            }
        }
    };

    function queryTicketList(page: number, table: HTMLTableElement, keys: string[], rowCallback: CallableFunction = () => { }) {
        // query ordered list
        // then update table
        // and store all select inputs to []
        BACKEND_ADDRESS;
        transPageNumberInput.value = String(page);
        pageInfo.pageNumberMax = 10; // TODO
        radioElements = []; // monkey patch 
    }

    function updatePaymentMsg(paymentMsgDiv: HTMLDivElement, msg: Node) {        
        removeAllChildren(paymentMsgDiv);
        paymentMsgDiv.append(msg);
    }

    function sendTicketRequest(ticketObject: Object) {
        // TODO
    }

    checkToken(window);
    // TODO
    var tokenObj = parseToken("");
    var pageInfo: PageInfo = new PageInfo();

    updateBanner(userIdBlank, userNameBlank, expirationTimeBlank, tokenObj.userId, tokenObj.userName, tokenObj.expirationDate);

    queryTicketList(pageInfo.pageNumber, ticketTable, TICKET_TABLE_KEYS, ticketRowCallback);



    regPageFlip(
        transPageNumberInput,
        previousTransPageButton,
        nextTransPageButton,
        pageInfo,
        (currentPage: number, nextPage: number) => {
            if (currentPage != nextPage)
                queryTicketList(pageInfo.pageNumber, ticketTable, TICKET_TABLE_KEYS, ticketRowCallback);
        });

    chooseButton.addEventListener("click", (ev: Event) => {
        if (selectedTicket != EMPTY_OBJECT) {
        paymentMsgDiv.hidden = false;
        confirmButton.hidden = false;
        discardButton.hidden = false;

        updatePaymentMsg(paymentMsgDiv, document.createTextNode("PLACEHOLDER"));
        }
    });
    confirmButton.addEventListener("click", (ev: Event) => {
        if (selectedTicket != EMPTY_OBJECT) {
            // TODO
        }
    });
    discardButton.addEventListener("click", (ev: Event) => {
        paymentMsgDiv.hidden = true;
        confirmButton.hidden = true;
        discardButton.hidden = true;
        selectedTicket = EMPTY_OBJECT;
    });
}