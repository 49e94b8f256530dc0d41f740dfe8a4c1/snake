import { expect } from "chai";
import { Key } from "ts-key-enum";
import { Snake } from "../../src/snake";

describe("Snake", function () {
  let snake: Snake;
  beforeEach(async () => {
    const canvas = document.createElement("canvas");
    snake = new Snake(canvas);
  });
  it("should create", () => {
    expect(snake).to.not.be.undefined;
  });
  it("should spawn snake", () => {
    snake.spawn();
    expect(snake.position).to.not.be.undefined;
  });
  it("should detect collisions", () => {
    // Spawn apple
    snake.spawnApple();
    // Set apple position
    snake.apple.position.update(0, { x: 50, y: 50 });
    // Simulate snake eating apple
    snake.position.update(0, { x: 50, y: 50 });
    snake.detectAppleCollision();
    // Snake should have grown
    expect(snake.segments).to.equal(4);
    snake.detectAppleCollision();
    // Snake size should remain the same,
    // since apple switched location
    expect(snake.segments).to.equal(4);
    // Change apple position
    snake.apple.position.update(0, { x: 60, y: 60 });
    snake.position.update(0, { x: 60, y: 60 });
    snake.detectAppleCollision();
    // Snake size grows again
    expect(snake.segments).to.equal(5);
    snake.apple.position.update(0, { x: 50, y: 50 });
    snake.position.update(0, { x: 50, y: 50 });
    snake.detectAppleCollision();
    // And one last time
    expect(snake.segments).to.equal(6);
    snake.detectCollision();
    expect(snake.inGame).to.equal(true);
    // Simulate going off the walls
    snake.position.update(0, { x: 301, y: 50 });
    snake.detectCollision();
    expect(snake.inGame).to.equal(false);
    snake.position.update(0, { x: 50, y: 301 });
    snake.detectCollision();
    expect(snake.inGame).to.equal(false);
    snake.position.update(0, { x: 50, y: 50 });
    snake.position.update(5, { x: 50, y: 50 });
    snake.detectCollision();
    expect(snake.inGame).to.equal(false);
  });
  it("should move snake correctly", () => {
    snake.spawn();
    snake.move();
    expect(snake.position.query(0)).to.deep.equal({ x: 60, y: 50 });
    snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
    snake.move();
    expect(snake.position.query(0)).to.deep.equal({ x: 60, y: 60 });
    snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowRight }));
    snake.move();
    expect(snake.position.query(0)).to.deep.equal({ x: 70, y: 60 });
    snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowUp }));
    snake.move();
    expect(snake.position.query(0)).to.deep.equal({ x: 70, y: 50 });
    snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowLeft }));
    snake.move();
    expect(snake.position.query(0)).to.deep.equal({ x: 60, y: 50 });
  });
  it("should reset corectly", () => {
    snake.reset();
    expect(snake.leftDirection).to.equal(false);
    expect(snake.upDirection).to.equal(false);
    expect(snake.rightDirection).to.equal(true);
    expect(snake.downDirection).to.equal(false);
  });
});
