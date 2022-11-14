export const BACKEND_ADDRESS = "";
export const PASSWORD_SALT = "114514";

// TODO
export const ORDER_TABLE_KEYS: string[] = ["check"];
export const TICKET_TABLE_KEYS: string[] = ["radio"];

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