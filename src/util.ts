import jsCookie from "js-cookie";
import { BACKEND_ADDRESS, LOGIN_PAGE, ORDER_ADDRESS, ORDER_TABLE_CUSTOM_ELEMENTS, ORDER_TABLE_KEYS } from "./config";

export var DEFAULT_ACCEPT = () => { };
export var DEFAULT_REJECT = () => { window.location.href = LOGIN_PAGE };
// export var DEFAULT_REJECT = () => { };

export function getBackendAddress(): string {
    let addr = jsCookie.get("backend");
    if (addr == null) {
        return BACKEND_ADDRESS;
    } else {
        return addr;
    }
}

export class ParsedToken {
    // userId = "";
    userName = "";
    // expirationDate = "";
};
export const EMPTY_TOKEN = new ParsedToken();

// export function parseToken(token: string): ParsedToken {
//     var retObj = new ParsedToken();
//     try {

//         let payload = jwt.decode(token, { json: true });
//         retObj.userName = payload["user"];
//     } catch (err: any) {
//         console.error(err);
//     }

//     return retObj;
// }

export function removeAllChildren(element: HTMLElement, startIndex: number = 0) {
    let children = element.childNodes;
    for (let index = children.length - 1; index >= startIndex; index--) {
        children[index].remove();
    }
}

export function updateBanner(
    // userIdBlank: HTMLDivElement,
    tokenBlank: HTMLDivElement,
    // expirationTimeBlank: HTMLDivElement,
    // userId: string,
    token: string,
    // expirationTime: string
) {
    // removeAllChildren(userIdBlank);
    removeAllChildren(tokenBlank);
    // removeAllChildren(expirationTimeBlank);
    // userIdBlank.appendChild(document.createTextNode(userId));
    tokenBlank.appendChild(document.createTextNode(token));
    // expirationTimeBlank.appendChild(document.createTextNode(expirationTime));
}

export function checkToken(window: Window,
    acceptCallback: CallableFunction = DEFAULT_ACCEPT,
    rejectCallback: CallableFunction = DEFAULT_REJECT) {
    window.addEventListener("load", () => {
        let to = jsCookie.get("token");
        if (to == null) {
            rejectCallback();
        } else {
            acceptCallback(to);
        }
    });
}

export function resetToken() {
    jsCookie.remove("token");
    window.location.href = LOGIN_PAGE;
}


export class PageInfo {
    pageNumber = 1;
    pageNumberMin = 1;
    pageNumberMax = 1;
}

export function regPageFlip(pageInput: HTMLInputElement, previousButton: HTMLButtonElement, nextButton: HTMLButtonElement, pageInfo: PageInfo, refreshCallback: CallableFunction = () => { }) {
    pageInput.addEventListener("keyup", (ev: KeyboardEvent) => {
        if (ev.key == "Enter") {
            let input = ev.target as HTMLInputElement;
            let pg = Number(input.value);
            let previousPg = pageInfo.pageNumber;
            pageInfo.pageNumber = pg;
            refreshCallback(previousPg, pg);
        }
    })
    previousButton.addEventListener("click", (ev: Event) => {
        if (pageInfo.pageNumber > pageInfo.pageNumberMin) {
            pageInfo.pageNumber--;
            refreshCallback(pageInfo.pageNumber + 1, pageInfo.pageNumber);
        }
    });
    nextButton.addEventListener("click", (ev: Event) => {
        if (pageInfo.pageNumber < pageInfo.pageNumberMax) {
            pageInfo.pageNumber++;
            refreshCallback(pageInfo.pageNumber - 1, pageInfo.pageNumber);
        }
    });
}

// queryTicketList(pageInfo.pageNumber, ticketTable, TICKET_TABLE_KEYS, ticketRowCallback)
export function updateTable(table: HTMLTableElement, keys: string[], values: object[], customElements: Map<string, CallableFunction>,
    rowCallback: CallableFunction = (tr: HTMLTableRowElement, t: HTMLTableElement) => { }) {
    removeAllChildren(table, 2);
    for (let rowNum = 1; rowNum <= values.length; rowNum++) {
        let tableRow = document.createElement("tr");

        let rowMap: Map<string, string> = new Map(Object.entries(values[rowNum - 1]));
        for (let index = 0; index < keys.length; index++) {
            let tableData = document.createElement("td");
            let cellValue = rowMap.get(keys[index]);
            if (typeof cellValue == "undefined") {
                let generator = customElements.get(keys[index]);
                if (typeof generator != "undefined")
                    tableData.append(generator(rowNum, index));
                else
                    tableData.append(cellValue);
            } else {
                tableData.appendChild(
                    document.createTextNode(cellValue));
            }
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
        rowCallback(rowNum, tableRow, table);
    }
}
