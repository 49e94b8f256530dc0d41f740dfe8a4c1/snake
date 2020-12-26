import { Key } from "ts-key-enum";
import appleImg from "./images/apple.png";
import dotImg from "./images/dot.png";
import headImg from "./images/head.png";
import { TwoDimensionalCoordinates } from "./utils";

const MAX_RAND = 29;
const SEGMENT_DIMENSION = 10;
const C_HEIGHT = 300;
const C_WIDTH = 300;

/**
 * Stores snake position in 2D by segment
 */
export class Position {
  private map: Map<number, TwoDimensionalCoordinates> = new Map();
  /**
   * Returns `x,y` position of segment
   * @param segment Snake's segment
   */
  query(segment: number): TwoDimensionalCoordinates {
    return this.map.get(segment);
  }
  update(segment: number, x: number, y: number) {
    this.map.set(segment, { x: x, y: y });
  }
}

export class Apple {
  public position = new Position();

  public spawn() {
    let r = Math.floor(Math.random() * MAX_RAND);
    const x = r * SEGMENT_DIMENSION;
    r = Math.floor(Math.random() * MAX_RAND);
    const y = r * SEGMENT_DIMENSION;
    this.position.update(0, x, y);
  }
}

export class Snake {
  private readonly DEFAULT_SEGMENT_AMOUNT = 3;
  private readonly HEAD = 0;
  private readonly START_POSITION = 50;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private headImg;
  private appleImg;
  private segmentImg;

  public segments: number = this.DEFAULT_SEGMENT_AMOUNT;

  public apple = new Apple();

  private leftDirection = false;
  private rightDirection = true;
  private upDirection = false;
  private downDirection = false;
  public inGame = true;

  private DELAY = 140;

  public position = new Position();

  constructor(canvas?: HTMLCanvasElement) {
    if (canvas) {
      this.canvas = canvas;
    } else {
      this.canvas = document.getElementById("playground") as HTMLCanvasElement;
    }
    this.ctx = this.canvas.getContext("2d");
    this.loadAssets();
    this.fillText("Press Play");
  }

  public reset() {
    this.inGame = true;
    this.leftDirection = false;
    this.rightDirection = true;
    this.upDirection = false;
    this.downDirection = false;
  }

  public start() {
    this.reset();
    this.spawn();
    this.spawnApple();
    setTimeout(this.loop.bind(this), this.DELAY);
  }

  private loadAssets() {
    this.headImg = new window.Image();
    this.headImg.src = headImg;
    this.segmentImg = new window.Image();
    this.segmentImg.src = dotImg;
    this.appleImg = new window.Image();
    this.appleImg.src = appleImg;
  }

  public spawnApple() {
    this.apple.spawn();
  }

  public spawn() {
    this.segments = this.DEFAULT_SEGMENT_AMOUNT;
    for (let segment = 0; segment < this.segments; segment++) {
      this.position.update(
        segment,
        this.START_POSITION - segment * SEGMENT_DIMENSION,
        this.START_POSITION
      );
    }
  }

  private render() {
    this.ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    if (!this.inGame) {
      this.gameOver();
      return;
    }

    const applePosition = this.apple.position.query(0);
    this.ctx.drawImage(this.appleImg, applePosition.x, applePosition.y);
    Array.apply(null, Array(this.segments)).forEach((_, index) => {
      const position = this.position.query(index);
      if (index === this.HEAD) {
        this.ctx.drawImage(this.headImg, position.x, position.y);
        return;
      }
      this.ctx.drawImage(this.segmentImg, position.x, position.y);
    });
  }

  private fillText(text: string) {
    this.ctx.fillStyle = "white";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "normal bold 18px serif";
    this.ctx.fillText(text, C_WIDTH / 2, C_HEIGHT / 2);
  }

  public detectAppleCollision(): void {
    const position = this.position.query(this.HEAD);
    const applePosition = this.apple.position.query(0);
    if (position.x == applePosition.x && position.y == applePosition.y) {
      this.segments++;
      this.position.update(
        this.segments,
        position.x + SEGMENT_DIMENSION,
        position.y + SEGMENT_DIMENSION
      );
      this.spawnApple();
    }
  }

  public detectCollision(): void {
    for (let segment = this.segments; segment > 0; segment--) {
      const headPosition = this.position.query(this.HEAD);
      const segmentPosition = this.position.query(segment);
      if (
        segment > this.DEFAULT_SEGMENT_AMOUNT + 1 &&
        headPosition.x === segmentPosition.x &&
        headPosition.y === segmentPosition.y
      ) {
        this.inGame = false;
        return;
      }
      switch (true) {
        case headPosition.y >= C_HEIGHT || headPosition.y < 0:
          this.inGame = false;
          break;
        case headPosition.x >= C_WIDTH || headPosition.x < 0:
          this.inGame = false;
          break;
        default:
          this.inGame = true;
      }
    }
  }

  private move(): void {
    for (let index = this.segments; index > 0; index--) {
      const previousSegmentCoordinates = this.position.query(index - 1);
      this.position.update(
        index,
        previousSegmentCoordinates.x,
        previousSegmentCoordinates.y
      );
    }
    const coordinates = this.position.query(this.HEAD);
    if (this.leftDirection) {
      coordinates.x -= SEGMENT_DIMENSION;
    }
    if (this.rightDirection) {
      coordinates.x += SEGMENT_DIMENSION;
    }
    if (this.upDirection) {
      coordinates.y -= SEGMENT_DIMENSION;
    }
    if (this.downDirection) {
      coordinates.y += SEGMENT_DIMENSION;
    }
    this.position.update(this.HEAD, coordinates.x, coordinates.y);
  }

  private loop() {
    if (this.inGame) {
      this.detectAppleCollision();
      this.detectCollision();
      this.move();
      this.render();
      setTimeout(this.loop.bind(this), this.DELAY);
    }
  }

  public onkeydown = (keyboardEvent: KeyboardEvent) => {
    const key = keyboardEvent.code;
    if (key === Key.ArrowLeft && !this.rightDirection) {
      this.leftDirection = true;
      this.upDirection = false;
      this.downDirection = false;
    }
    if (key === Key.ArrowRight && !this.leftDirection) {
      this.rightDirection = true;
      this.upDirection = false;
      this.downDirection = false;
    }
    if (key === Key.ArrowUp && !this.downDirection) {
      this.upDirection = true;
      this.rightDirection = false;
      this.leftDirection = false;
    }
    if (key === Key.ArrowDown && !this.upDirection) {
      this.downDirection = true;
      this.rightDirection = false;
      this.leftDirection = false;
    }
  };

  private gameOver(): void {
    this.fillText("Game Over");
  }
}
