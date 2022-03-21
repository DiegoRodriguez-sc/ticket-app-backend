const express  = require("express");
const http     = require("http");
const socketio = require("socket.io");
const path     = require("path");
const Sockets  = require("./sockets");
const cors     = require("cors");


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
  }

  middlewares(){
   this.app.use(express.static(path.resolve( __dirname ,"../public")) );
  
    // cors
    this.app.use(cors());
  }
  
  configurarSockets(){
      new Sockets(this.io);

  }

  execute() {
   // inicializar middlewares
    this.middlewares();

   // configurar sockets
   this.configurarSockets();

    // inicializar servidor
    this.server.listen(this.port, () => {
      console.log("server corriendo en el puerto :",this.port);
    });
  }
}

module.exports = Server;
