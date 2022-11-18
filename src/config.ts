export const BACKEND_ADDRESS = "http://localhost:8080/test";
export const ACCOUNT_ADDRESS = BACKEND_ADDRESS + "/account";
export const ORDER_ADDRESS = BACKEND_ADDRESS + "/order";
export const BOOK_ADDRESS = BACKEND_ADDRESS + "/ticket";

export const PASSWORD_SALT = "114514";

// TODO
export const ORDER_TABLE_KEYS: string[] = [
    "check", 
    "oid",
    "tid",
    "tname",
    "odate",
    "tdepr",
    "tdest",
    "tdate",
];
export const TICKET_TABLE_KEYS: string[] = [
    "radio",
    "tid",
    "tname",
    "tdepr",
    "tdest",
    "tdate",
];

export const ORDER_TABLE_CUSTOM_ELEMENTS: Map<string, CallableFunction> = new Map<string, CallableFunction>(
    [
        ["check", (row: number, col: number) => { let e = document.createElement("input"); e.type = "checkbox"; e.id = `order-checkbox_${row}`; }],
    ]
);
export const TICKET_TABLE_CUSTOM_ELEMENTS: Map<string, CallableFunction> = new Map<string, CallableFunction>(
    [
        ["radio", (row: number, col: number) => { let e = document.createElement("input"); e.type = "radio"; e.name = "ticket"; e.id = `ticket-radio_${row}`; }],
    ]
);