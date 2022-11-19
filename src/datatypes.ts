export class Ticket {
    tid: string;
    tname: string;
    tdepr: string;
    tdest: string;
    tdate: string;
    price: number;

    constructor(
        id: string = "",
        name: string = "",
        tdepr: string = "",
        tdest: string = "",
        validationDate: string = "",
        price: number = 0,
    ) {
        this.tid = id;
        this.tname = name;
        this.tdepr = tdepr;
        this.tdest = tdest;
        this.tdate = validationDate;
        this.price = price;
    }
}

export class TicketEntry {
    ticket: Ticket;
    remain: number;

    constructor(t: Ticket = new Ticket(), remain: number) {
        this.ticket = t;
        this.remain = remain;
    }
}

export class TicketEntryFlat {
    tid: string = "";
    tname: string = "";
    tdepr: string = "";
    tdest: string = "";
    tdate: string = "";
    price: number = 0;
    remain: number = 0;

    constructor(e: TicketEntry) {
        this.tid = e.ticket.tid;
        this.tname = e.ticket.tname;
        this.tdepr = e.ticket.tdepr;
        this.tdest = e.ticket.tdest;
        this.tdate = e.ticket.tdate;
        this.price = e.ticket.price;
        this.remain = e.remain;
    }
}

export class Order {
    oid: string;
    ticket: Ticket;
    count: number;
    odate: string;

    constructor(oid: string, ticket: Ticket, count: number, odate: string) {
        this.oid = oid;
        this.ticket = ticket;
        this.count = count;
        this.odate = odate;
    }
}

export class OrderFlat {
    oid: string = "";
    count: number = 0;
    odate: string = "";
    tid: string = "";
    tname: string = "";
    tdepr: string = "";
    tdest: string = "";
    tdate: string = "";
    price: number = 0;

    constructor(o: Order) {
        this.oid = o.oid;
        this.count = o.count;
        this.odate = o.odate;
        this.tid = o.ticket.tid;
        this.tname = o.ticket.tname;
        this.tdepr = o.ticket.tdepr;
        this.tdest = o.ticket.tdest;
        this.tdate = o.ticket.tdate;
        this.price = o.ticket.price;
    }
}