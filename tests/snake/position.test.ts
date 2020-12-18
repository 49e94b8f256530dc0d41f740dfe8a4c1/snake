import { expect } from "chai";
import { Position } from "../../src/snake";

describe("Position", () => {
  let position: Position;
  beforeEach(() => {
    position = new Position(3, 3);
  });
  it("should create", () => {
    expect(position.x).to.deep.equal(new Array(3));
    expect(position.y).to.deep.equal(new Array(3));
  });
  it("should update grid", () => {
    position.update(1, 2, 0);
    expect(position.query(1)).to.deep.equal({ x: 2, y: 0 });
  });
});
