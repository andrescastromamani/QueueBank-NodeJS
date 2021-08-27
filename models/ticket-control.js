const path = require('path');
const fs = require('fs');


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
        console.log(toDay, latest, latestFour, tickets);
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
}
module.exports = TicketControl;