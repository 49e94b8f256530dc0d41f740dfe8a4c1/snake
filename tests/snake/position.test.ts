import { expect } from "chai";
import { Position } from "../../src/position";

describe("Position", () => {
  let position: Position;
  beforeEach(() => {
    position = new Position();
  });
  it("should create", () => {
    expect(position).to.not.be.undefined;
  });
  it("should update and return correct position on query", () => {
    const coordinates = { x: 2, y: 0 };
    position.update(1, coordinates);
    expect(position.query(1)).to.deep.equal({ x: 2, y: 0 });
  });
});
