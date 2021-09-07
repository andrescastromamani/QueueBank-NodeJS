const lblDesktop = document.querySelector('h1');
const btnAttention = document.querySelector('button');
const lblTicket = document.querySelector('small');
const lblAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}
const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;
lblAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAttention.disabled = false;

});

socket.on('disconnect', () => {
    btnAttention.disabled = true;
});
socket.on('pending-tickets', (pending) => {
    if (pending === 0) {
        lblPendientes.style.display = 'none'
    } else {
        lblPendientes.style.display = ''
        lblPendientes.innerText = pending;
    }
})

btnAttention.addEventListener('click', () => {
    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'Empty'
            return lblAlert.style.display = '';
        }
        lblTicket.innerText = 'T-' + ticket.number;
    })
});