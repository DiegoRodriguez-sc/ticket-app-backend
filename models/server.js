const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // http server
    this.server = http.createServer(this.app);

    // confi sockets
    this.io = socketio(this.server, {
      /* configuraciones*/
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.get("/last", (req, res) => {
      res.json({
        ok: true,
        last: this.sockets.newTicket.last13,
      });
    });

    // cors
    this.app.use(cors());
  }

  execute() {
    // inicializar middlewares
    this.middlewares();

    // inicializar servidor
    this.server.listen(this.port, () => {
      console.log("server corriendo en el puerto :", this.port);
    });
  }
}

module.exports = Server;
