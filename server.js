const express = require('express');
const {Server} = require('socket.io');
const cors = require('cors')

const app = express();
let PORT = 3000;

app.use(cors())
app.use(express.static("public"));

let server = app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT : ${PORT}`)
})

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("CONNECTION CREATED");

    // Received data
    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })

    socket.on("createSticky", (data) => {
        io.sockets.emit("createSticky", data);
    })
})