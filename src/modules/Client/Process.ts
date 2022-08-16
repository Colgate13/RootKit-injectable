import os from 'os';
import cluster from 'cluster';

class ProcessController {
  static PrimaryProcess() {
    // if (cluster.isPrimary) {
    process.title = 'Ladino - Apache';
    console.log('> Primary process started');
    const processesCount = os.cpus().length;
    console.log(`> Server Primary running in process - ${process.pid}`);
    console.log(`> Server Forking process, creating a Worker process - ${processesCount}\n`);

    // for (let index = 0; index < 5; index++) { cluster.fork(); }
    cluster.fork();

    cluster.on('exit', async (worker, code) => {
      if (code !== 0 && !worker.exitedAfterDisconnect) {
        console.log(`> Server Worker [PID = ${worker.process.pid}] ending/died, Forking another Worker process!`);
        cluster.fork();
      }
    });

    return true;
    //   }

    //   process.title = 'Linux Server';

    //   return false;
  }

  static ForkWorker() {
    cluster.fork();
  }
}


export default ProcessController;