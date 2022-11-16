export class Ticket {
    tid: string;
    tname: string;
    tdepr: string;
    tdest: string;
    tdate: string;

    constructor(
        id: string = "",
        name: string = "",
        tdepr: string = "",
        tdest: string = "",
        validationDate: string = ""
    ) {
        this.tid = id;
        this.tname = name;
        this.tdepr = tdepr;
        this.tdest = tdest;
        this.tdate = validationDate;
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