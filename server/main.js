const { Socket } = require("dgram");
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
  {
    id: 1,
    text: "hola soy el Admin",
    autor: "Erminio Guerrero",
  },
];

app.use(express.static("public"));

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con socket");
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

server.listen(8000, function () {
  console.log("El servisor esta funcionando en el puerto: ", 8000);
});
