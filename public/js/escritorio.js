const lblDesktop = document.querySelector('h1');
const btnAttention = document.querySelector('button');
const lblTicket = document.querySelector('small');
const lblAlert = document.querySelector('.alert');


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
socket.on('latest-ticket', (latest) => {

})

btnAttention.addEventListener('click', () => {
    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg}) => {
        if (!ok) {
            lblTicket.innerText = 'Empty'
            return lblAlert.style.display = '';
        }
        lblTicket.innerText = 'T-'+ticket.number;
    })
});