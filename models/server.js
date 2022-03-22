const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      last:"/last"
    }

    // http server
    this.server = http.createServer(this.app);

    // confi sockets
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    //cors
    this.app.use(cors());


    this.app.get("/last", (req, res) => {
      res.json({
        ok: true,
        last: this.sockets.newTicket.last13,
      });
    });
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
