import { Entity } from "../../core/domain/Entity";

interface IMachine {
  id?: string;
  name: string;
  socketId?: string;
}

export class Machine extends Entity<IMachine>{

  public socketId: string = "";

  constructor(MachineProps: IMachine) {
    super(MachineProps, MachineProps.id);

    this.socketId = MachineProps.socketId || "";
  }

  get id(): string {
    return this.id;
  }

  set SocketId(socketId: string) {
    this.socketId = socketId;
    this.equals()
  }

}