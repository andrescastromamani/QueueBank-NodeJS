const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, box) {
        this.number = number;
        this.box = box;
    }
}

class TicketControl {
    constructor() {
        this.latest = 0;
        this.toDay = new Date().getDate();
        this.tickets = [];
        this.latestFour = [];

        this.init();
    }
    get toJson() {
        return {
            latest: this.latest,
            toDay: this.toDay,
            tickets: this.tickets,
            latestFour: this.latestFour
        }
    }
    init() {
        const { toDay, latest, latestFour, tickets } = require('../db/data.json');
        //console.log(toDay, latest, latestFour, tickets);
        if (toDay === this.toDay) {
            this.tickets = tickets;
            this.latest = latest;
            this.latestFour = latestFour;
        } else {
            this.saveDB();
        }
    }
    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }
    next() {
        this.latest += 1;
        const ticket = new Ticket(this.latest, null);
        this.tickets.push(ticket);
        this.saveDB();
        return 'Ticket' + ticket.number;
    }
    attendNext(box) {
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.box = box;
        this.latestFour.unshift(ticket);

        if (this.latestFour.length > 4) {
            this.latestFour.splice(-1, 1);
        }
        this.saveDB();
        return ticket;
    }
}
module.exports = TicketControl;