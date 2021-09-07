const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('latest-ticket', ticketControl.latest);
    socket.emit('status-actual', ticketControl.latestFour);
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    });
    socket.on('attend-ticket', ({ desktop }, callback) => {
        console.log(desktop);
        if (!desktop) {
            return callback({
                ok: false,
                msg: "Desktop is required"
            })
        }
        const ticket = ticketControl.attendNext(desktop);
        socket.broadcast.emit('status-actual', ticketControl.latestFour);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Not exist tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    })
}

module.exports = {
    socketController
}
