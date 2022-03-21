const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.newTicket = new TicketList();

    this.SocketEvents();
  }

  SocketEvents() {
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");
      // escuchar evento
      socket.on("solicitar-ticket", (data, callBack) => {
        const ticket = this.newTicket.createTicket();
        callBack(ticket);
      });
      socket.on("siguiente-ticket-trabajar", ({ agente, escritorio }, callBack) => {
          const ticket = this.newTicket.assignTicket(agente, escritorio);
          callBack(ticket);
        }
      );
    });
  }
}

module.exports = Sockets;
