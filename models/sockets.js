class Sockets {
  constructor(io) {
    this.io = io;
    this.SocketEvents();
  }

  SocketEvents() {
    this.io.on("connection", (socket) => {
      // escuchar evento
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
