import { Character } from "./character";
import img from "./images/apple.png";

export class Apple extends Character {
  private readonly maxRand = 29;
  private readonly segmentDimension = 10;
  private readonly segment = 0;
  public img: HTMLImageElement;
  constructor() {
    super();
    this.img = new window.Image();
    this.img.src = img;
  }
  public spawn() {
    let r = Math.floor(Math.random() * this.maxRand);
    const x = r * this.segmentDimension;
    r = Math.floor(Math.random() * this.maxRand);
    const y = r * this.segmentDimension;
    this.position.update(this.segment, { x, y });
  }
}
