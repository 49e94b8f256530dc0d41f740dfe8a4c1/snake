import { expect } from "chai";
import { Snake } from "../../src/snake";
import jsdom from "mocha-jsdom";

describe("Snake", function () {
  jsdom({
    html: `<canvas id="playground"></canvas>`,
    url: "http://localhost",
  });
  let snake: Snake;
  beforeEach(() => {
    snake = new Snake();
  });
  it("should create", function () {
    expect(snake).to.not.be.undefined;
  });
  it("should spawn snake", function () {
    snake.spawnSnake();
    expect(snake).to.not.be.undefined;
  });
});
