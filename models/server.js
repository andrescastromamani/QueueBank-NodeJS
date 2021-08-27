const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {

        }
        //Middleware
        this.midleware();
        //Routes
        this.routes();
        //Socket
        this.socket();
    }

    midleware() {
        //CORS
        this.app.use(cors());
        //Static files
        this.app.use(express.static('public'));
    }
    routes() {

    }
    //Socket
    socket() {
        this.io.on('connection', socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;