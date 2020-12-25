import { expect } from "chai";
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
    snake.spawnSnake();
    expect(snake.position).to.not.be.undefined;
  });
  it("should spawn apple", () => {
    snake.spawnApple();
    expect(snake.apple.x).to.be.a("number");
    expect(snake.apple.y).to.be.a("number");
  });
  it("should detect collisions", () => {
    // Spawn apple
    snake.spawnApple();
    // Change apple position
    snake.apple.x = 50;
    snake.apple.y = 50;
    // Simulate snake eating apple
    snake.position.update(0, 50, 50);
    snake.detectAppleCollision();
    // Snake should have grown
    expect(snake.segments).to.equal(4);
    snake.detectAppleCollision();
    // Snake size should remain the same,
    // since apple switched location
    expect(snake.segments).to.equal(4);
    // Change apple position
    snake.apple.x = 50;
    snake.apple.y = 50;
    snake.position.update(0, 50, 50);
    snake.detectAppleCollision();
    // Snake size grows again
    expect(snake.segments).to.equal(5);
    snake.apple.x = 50;
    snake.apple.y = 50;
    snake.position.update(0, 50, 50);
    snake.detectAppleCollision();
    // And one last time
    expect(snake.segments).to.equal(6);
    snake.detectCollision();
    expect(snake.inGame).to.equal(true);
    // Simulate going off the walls
    snake.position.update(0, 301, 50);
    snake.detectCollision();
    expect(snake.inGame).to.equal(false);
    snake.position.update(0, 50, 301);
    snake.detectCollision();
    expect(snake.inGame).to.equal(false);
    snake.position.update(0, 50, 50);
    snake.position.update(5, 50, 50);
    snake.detectCollision();
    expect(snake.inGame).to.equal(false);
  });
});
