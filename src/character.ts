import { Position } from "./position";

export class Character {
  public position = new Position();
  public spawn() {
    throw new Error("Not Implemented");
  }
}
