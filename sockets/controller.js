
const socketController = (socket) => {
    socket.on('emit-message', (payload) => {
        console.log('Message: ', payload);
        //Send Payload to Clients
        socket.broadcast.emit('emit-message', payload);
    });
}

module.exports = {
    socketController
}
