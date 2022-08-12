import { Server } from "socket.io";
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

console.clear();

Server.setMaxListeners(1000);
const rl = readline.createInterface({ input, output });
const socket = new Server(1337);

console.log("> Server on in 1337");
let sendEvent = false;
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
      sendEvent = false;
    });


    rl.on('line', (input) => {

      if (!sendEvent) {
        console.log("> Command = ", input);
        console.log("> Exec command Emmiting on SocketId = ", socket.id);
        socket.emit("exec", input);
        sendEvent = true;
      }
    
    });
    
});