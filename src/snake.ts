import { Key } from "ts-key-enum";
import appleImg from "./images/apple.png";
import dotImg from "./images/dot.png";
import headImg from "./images/head.png";
import { TwoDimensionalCoordinates } from "./utils";

const MAX_RAND = 29;
const SEGMENT_DIMENSION = 10;
const C_HEIGHT = 300;
const C_WIDTH = 300;
const ALL_DOTS = C_WIDTH * C_HEIGHT;

/**
 * Stores snake position in 2D by segment
 */
export class Position {
  public x: Array<number>;
  public y: Array<number>;
  constructor(width: number, height: number) {
    this.x = new Array(width);
    this.y = new Array(height);
  }
  /**
   * Returns `x,y` position of segment
   * @param segment Snake's segment
   */
  query(segment: number): TwoDimensionalCoordinates {
    return { x: this.x[segment], y: this.y[segment] };
  }
  update(segment: number, x: number, y: number) {
    this.x[segment] = x;
    this.y[segment] = y;
  }
}

export class Apple {
  public x: number;
  public y: number;

  public spawn() {
    let r = Math.floor(Math.random() * MAX_RAND);
    this.x = r * SEGMENT_DIMENSION;
    r = Math.floor(Math.random() * MAX_RAND);
    this.y = r * SEGMENT_DIMENSION;
  }
}

export class Snake {
  private readonly DEFAULT_SEGMENT_AMOUNT = 3;
  private readonly HEAD = 0;
  private readonly START_POSITION = 50;
  private canvas;
  private ctx;

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

  public position = new Position(ALL_DOTS, ALL_DOTS);

  constructor() {
    this.canvas = document.getElementById("playground");
    this.ctx = this.canvas.getContext("2d");
    this.loadAssets();
  }

  public start() {
    this.spawnSnake();
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

  public spawnSnake() {
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

    this.ctx.drawImage(this.appleImg, this.apple.x, this.apple.y);
    for (let segment = 0; segment < this.segments; segment++) {
      const position = this.position.query(segment);
      if (segment === this.HEAD) {
        this.ctx.drawImage(this.headImg, position.x, position.y);
        continue;
      }
      this.ctx.drawImage(this.segmentImg, position.x, position.y);
    }
  }

  private gameOver(): void {
    const GAME_OVER_TEXT = "Game Over";
    this.ctx.fillStyle = "white";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "normal bold 18px serif";
    this.ctx.fillText(GAME_OVER_TEXT, C_WIDTH / 2, C_HEIGHT / 2);
  }

  public detectAppleCollision(): void {
    if (
      this.position.x[this.HEAD] == this.apple.x &&
      this.position.y[this.HEAD] == this.apple.y
    ) {
      this.segments++;
      this.spawnApple();
    }
  }

  public detectCollision(): void {
    for (let segment = this.segments; segment > 0; segment--) {
      const headPosition = this.position.query(0);
      const segmentPosition = this.position.query(segment);
      if (
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
    for (let segment = this.segments; segment > 0; segment--) {
      this.position.update(
        segment,
        this.position.x[segment - 1],
        this.position.y[segment - 1]
      );
    }
    if (this.leftDirection) {
      this.position.x[this.HEAD] -= SEGMENT_DIMENSION;
    }
    if (this.rightDirection) {
      this.position.x[this.HEAD] += SEGMENT_DIMENSION;
    }
    if (this.upDirection) {
      this.position.y[this.HEAD] -= SEGMENT_DIMENSION;
    }
    if (this.downDirection) {
      this.position.y[this.HEAD] += SEGMENT_DIMENSION;
    }
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
}
