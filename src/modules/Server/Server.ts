import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { WebSocketServer, IServer } from "./WebSocketServer";
import { Machine } from './Machine';

export class Server {

  public machineCurrentSocketId = "";
  private rl = readline.createInterface({ input, output });
  protected Port: number;
  protected webSocketServer: WebSocketServer;
  protected Socket: IServer;
  protected machines: Machine[] = [];

  constructor(Port: number) {
    console.log(`> Server linsting in ${Port}`);
    this.Port = Port;
    this.webSocketServer = new WebSocketServer(this.Port);
    this.Socket = this.webSocketServer.createWsServer();
  }

  get list() {
    return this.machines;
  }

  set machineSocketId(SocketId: string) {
    this.machineCurrentSocketId = SocketId;
  }

  build() {

    this.Socket.on('connect', async (socket) => {
    
      this.machines.push(new Machine({
        name: socket.id,
        socketId: socket.id
      }));
    
      this.rl.on('line', (input) => {
    
        switch (true) {
          case input == "list":
            this.machines.forEach((machine: Machine) => {
              console.log(machine);
            });
            console.log("\n");
            break;
          case input.includes("-c") == true:
            this.machineCurrentSocketId = input.replace(/-c/gm, "").split(" ")[1];
            console.log(`Machine Current Changer to Machine id -${this.machineCurrentSocketId}-`);
            break;
          default:
            console.log(this.machineCurrentSocketId);
            this.machines.length > 1
              ? socket.to(this.machineCurrentSocketId).emit("exec", input)
              : socket.emit("exec", input);
                        
            break;
        }

      });
    
    })
  }

}







