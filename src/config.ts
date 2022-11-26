export const BACKEND_ADDRESS = "https://cn-ah-dx-1.natfrp.cloud:53026/DS";
// export const BACKEND_ADDRESS = "http://localhost:8080/test";
export const ACCOUNT_ADDRESS = (backend: string) => backend + "/account";
export const ORDER_ADDRESS = (backend: string) => backend + "/order";
export const BOOK_ADDRESS = (backend: string) => backend + "/ticket";

export const LOGIN_PAGE = "login.html";
export const ORDER_PAGE = "order_list.html";
export const TICKET_PAGE = "transaction.html";

export const PASSWORD_SALT = "114514";

export const PAYMENT_PLACEHOLDER_LINK = "https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4";

// TODO
export const ORDER_TABLE_KEYS: string[] = [
    "check",
    "oid",
    // "tid",
    "tname",
    "odate",
    "tdepr",
    "tdest",
    "tdate",
];
export const TICKET_TABLE_KEYS: string[] = [
    "radio",
    // "tid",
    "tname",
    "tdepr",
    "tdest",
    "tdate",
    "count",
    "price",
];

export const ORDER_TABLE_CUSTOM_ELEMENTS: Map<string, CallableFunction> = new Map<string, CallableFunction>(
    [
        ["check", (row: number, col: number) => { let e = document.createElement("input"); e.type = "checkbox"; e.id = `order-checkbox_${row}`; return e; }],
    ]
);
export const TICKET_TABLE_CUSTOM_ELEMENTS: Map<string, CallableFunction> = new Map<string, CallableFunction>(
    [
        ["radio", (row: number, col: number) => { let e = document.createElement("input"); e.type = "radio"; e.name = "ticket"; e.id = `ticket-radio_${row}`; return e; }],
    ]
);