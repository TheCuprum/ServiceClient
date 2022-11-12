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
    const orderPageNumber = document.getElementById("order-page-number") as HTMLInputElement;
}