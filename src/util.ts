import jsCookie from "js-cookie";

export var DEFAULT_ACCEPT = () => { };
// export var DEFAULT_REJECT = () => { window.location.href = "login.html" };
export var DEFAULT_REJECT = () => { };

export class ParsedToken {
    userId = "";
    userName = "";
    expirationDate = "";
};
export const EMPTY_TOKEN = new ParsedToken();

export function parseToken(token: string): ParsedToken {
    var retObj = new ParsedToken();

    // TODO
    return retObj;
}

export function removeAllChildren(element: HTMLElement, startIndex: number = 0) {
    let children = element.childNodes;
    for (let index = children.length - 1; index >= startIndex; index--) {
        children[index].remove();
    }
}

export function updateBanner(userIdBlank: HTMLDivElement,
    userNameBlank: HTMLDivElement,
    expirationTimeBlank: HTMLDivElement,
    userId: string,
    userName: string,
    expirationTime: string) {
    removeAllChildren(userIdBlank);
    removeAllChildren(userNameBlank);
    removeAllChildren(expirationTimeBlank);
    userIdBlank.appendChild(document.createTextNode(userId));
    userNameBlank.appendChild(document.createTextNode(userName));
    expirationTimeBlank.appendChild(document.createTextNode(expirationTime));
}

export function checkToken(window: Window,
    acceptCallback: CallableFunction = DEFAULT_ACCEPT,
    rejectCallback: CallableFunction = DEFAULT_REJECT) {
    window.addEventListener("load", () => {
        let to = jsCookie.get("token");
        if (to == null) {
            rejectCallback();
        } else {
            // if (parsedToken.xxxxx <= Date.now() )
            acceptCallback(to);
            // tokenObj["token"] = to;
            // tokenObj["hasToken"] = true;
        }
    });
}

//Cookies.set('name', 'value', { expires: 7, path: '' })

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
    removeAllChildren(table, 1);
    for (let rowNum = 1; rowNum <= values.length; rowNum++) {
        let tableRow = document.createElement("tr");

        let rowMap: Map<string, string> = new Map(Object.entries(values[rowNum - 1]));
        for (let index = 0; index < keys.length; index++) {
            let tableData = document.createElement("td");
            let cellValue = rowMap.get(keys[index]);
            if (cellValue == undefined) {
                let generator = customElements.get(keys[index]);
                if (generator != undefined)
                    tableData.append(generator(rowNum, index));
            } else {
                tableData.appendChild(
                    document.createTextNode(cellValue));
            }
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
        rowCallback(tableRow, table);
    }
}
