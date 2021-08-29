const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const button = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    button.disabled = false;

});

socket.on('disconnect', () => {
    button.disabled = true;
});
socket.on('latest-ticket', (latest) => {
    lblNuevoTicket.innerText = 'Ticket' + latest;
})

button.addEventListener('click', () => {
    socket.emit('next-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});