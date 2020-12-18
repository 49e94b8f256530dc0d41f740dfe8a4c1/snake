import { Key } from "ts-key-enum";
import appleImg from "./images/apple.png";
import dotImg from "./images/dot.png";
import headImg from "./images/head.png";

const ALL_DOTS = 900;
const MAX_RAND = 29;
const SEGMENT_DIMENSION = 10;
const C_HEIGHT = 300;
const C_WIDTH = 300;

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
  private readonly START_POINT = 50;
  private canvas;
  private ctx;

  private headImg;
  private appleImg;
  private segmentImg;

  private segments;
  private apple = new Apple();

  private leftDirection = false;
  private rightDirection = true;
  private upDirection = false;
  private downDirection = false;
  private inGame = true;

  private DELAY = 140;

  private x = new Array(ALL_DOTS);
  private y = new Array(ALL_DOTS);

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

  public spawnSnake() {
    this.segments = this.DEFAULT_SEGMENT_AMOUNT;
    for (let segment = 0; segment < this.segments; segment++) {
      this.x[segment] = this.START_POINT - segment * SEGMENT_DIMENSION;
      this.y[segment] = this.START_POINT;
    }
  }

  private draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (!this.inGame) {
      this.gameOver();
      return;
    }

    // Draw apple
    this.ctx.drawImage(this.appleImg, this.apple.x, this.apple.y);
    // Draw snake
    for (let segment = 0; segment < this.segments; segment++) {
      if (segment === 0) {
        this.ctx.drawImage(this.headImg, this.x[segment], this.y[segment]);
        continue;
      }
      this.ctx.drawImage(this.segmentImg, this.x[segment], this.y[segment]);
    }
  }

  private gameOver(): void {
    this.ctx.fillStyle = "white";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "normal bold 18px serif";
    this.ctx.fillText("Game Over", C_WIDTH / 2, C_HEIGHT / 2);
  }

  private detectAppleCollision(): void {
    // If apple coordinates match snake head coordinates
    if (this.x[0] == this.apple.x && this.y[0] == this.apple.y) {
      this.segments++;
      this.spawnApple();
    }
  }

  private move(): void {
    for (let segment = this.segments; segment > 0; segment--) {
      this.x[segment] = this.x[segment - 1];
      this.y[segment] = this.y[segment - 1];
    }
    if (this.leftDirection) {
      this.x[0] -= SEGMENT_DIMENSION;
    }
    if (this.rightDirection) {
      this.x[0] += SEGMENT_DIMENSION;
    }
    if (this.upDirection) {
      this.y[0] -= SEGMENT_DIMENSION;
    }
    if (this.downDirection) {
      this.y[0] += SEGMENT_DIMENSION;
    }
  }

  private detectCollision(): void {
    for (let segment = this.segments; segment > 0; segment--) {
      if (
        segment > 4 &&
        this.x[0] === this.x[segment] &&
        this.y[0] === this.y[segment]
      ) {
        this.inGame = false;
      }
    }
    if (this.y[0] >= C_HEIGHT || this.y[0] < 0) {
      this.inGame = false;
    }
    if (this.x[0] >= C_WIDTH || this.x[0] < 0) {
      this.inGame = false;
    }
  }

  private spawnApple() {
    this.apple.spawn();
  }

  private loop() {
    if (this.inGame) {
      this.detectAppleCollision();
      this.detectCollision();
      this.move();
      this.draw();
      setTimeout(this.loop.bind(this), this.DELAY);
    }
  }

  public onkeydown = function (keyboardEvent: KeyboardEvent) {
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
