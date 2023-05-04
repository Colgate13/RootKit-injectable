import { io } from "socket.io-client";
import { exec } from "child_process";
import ProcessController from './Process';
import cluster from 'cluster';

const socket = io("ws://localhost:7777/", {});

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("exec", (data: any) => {
  console.log(`data`, data.toString());

  try {
    exec(data.toString(), (error, stdout, stderr) => {
      if (error) {
        socket.emit("execReturnError", `${error} - ${data.toString()}`);
      }
      if (stderr) {
        socket.emit("execReturnError", `${stderr} - ${data.toString()}`);
      }

      socket.emit("execReturn", stdout);

    });
  } catch (error) {
    if (error) {
      socket.emit("execReturnError", `${error} - ${data.toString()}`);
    }
  }

});

socket.on("disconnect", () => {
  // ProcessController.PrimaryProcess();
  console.log(`Disconnect For SocketServer`);
});


process.on('SIGTERM', () => {
  ProcessController.ForkWorker();
});

process.on('SIGINT', () => {
  ProcessController.ForkWorker();
});