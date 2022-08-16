import { Server, Socket } from "socket.io";
export { Server as IServer } from "socket.io";

export class WebSocketServer {
  private PORT: number;

  constructor(Port: number) {
    this.PORT = Port;
  }

  createWsServer(): Server {
    const socket = new Server(this.PORT);

    Server.setMaxListeners(1000);
    
    socket.on("connect", (socket) => {
      console.log(`> Server >> User connect using SocketId = ${socket.id}`);
      
      socket.on("disconnect", () => {
        console.log(`> Server >> User disconnect using SocketId = ${socket.id}`);
      });
      
      socket.on("getDatas", (data) => {
        console.log(data);
      });
      
      socket.on("execReturnError", (data) => {
        console.log(`> Server >> Command Error >> execReturnError Error in exec comand on socketId = ${socket.id}`);
        console.log(`Command error ${data.toString()}`);
      });
      
      socket.on("execReturn", (data) => {
        console.log(`Return Command On SocketId = ${socket.id}`);
        console.log(data);
      });
        
    });

    return socket;
  }
}