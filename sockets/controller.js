const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('latest-ticket', ticketControl.latest);
    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });
    socket.on('attend-ticket', ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: "Desktop is required"
            })
        }
    })
}

module.exports = {
    socketController
}
