import jsCookie from "js-cookie";

export var DEFAULT_ACCEPT = () => { };
// export var DEFAULT_REJECT = () => { window.location.href = "login.html" };
export var DEFAULT_REJECT = () => { };

export class ParsedToken {
    userId = "";
    userName = "";
    expirationDate = "";
};

export function parseToken(token: string): ParsedToken {
    var retObj = new ParsedToken();

    // TODO
    return retObj;
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
    userIdBlank.append(document.createTextNode(userId));
    userNameBlank.append(document.createTextNode(userName));
    expirationTimeBlank.append(document.createTextNode(expirationTime));
}

export function removeAllChildren(element: HTMLElement) {
    let children = element.childNodes;
    for (let index = children.length - 1; index >= 0; index--) {
        children[index].remove();
    }
}

export function checkToken(window: Window,
    acceptCallback: CallableFunction = DEFAULT_ACCEPT,
    rejectCallback: CallableFunction = DEFAULT_REJECT) {
    window.onload = () => {
        let to = jsCookie.get("token");
        if (to == null) {
            console.log("reject");

            rejectCallback();
        } else {
            acceptCallback();
            // tokenObj["token"] = to;
            // tokenObj["hasToken"] = true;
        }
    };
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