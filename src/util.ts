export function parseToken(token: string): Object {
    var retObj = {
        "userId": null,
        "userName": null,
        "expiration-date": null
    }
    // TODO
    return retObj;
}

export function updateBanner(userIdBlank: HTMLDivElement, 
                             userNameBlank: HTMLDivElement, 
                             expirationTimeBlank: HTMLDivElement,
                             userId: string,
                             userName: string,
                             expirationTime: string){
    removeAllChildren(userIdBlank);
    removeAllChildren(userNameBlank);
    removeAllChildren(expirationTimeBlank);
    userIdBlank.append(document.createTextNode(userId));
    userNameBlank.append(document.createTextNode(userName));
    expirationTimeBlank.append(document.createTextNode(expirationTime));
}

export function removeAllChildren(element: HTMLElement){
    let children = element.childNodes;
    for (let index = children.length - 1; index >=0; index--){
        children[index].remove();
    }
}