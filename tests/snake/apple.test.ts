import { Apple } from "../../src/apple";
import { expect } from "chai";

describe("Apple", () => {
  let apple: Apple;
  beforeEach(() => {
    apple = new Apple();
    apple.spawn();
  });
  it("should create", () => {
    expect(apple).to.not.be.undefined;
  });
  it("should spawn", () => {
    expect(apple.position.query(0)).to.have.keys("x", "y");
  });
});
