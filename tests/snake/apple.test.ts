import { expect } from "chai";
import { Apple } from "../../src/snake";

describe("Apple", () => {
  let apple: Apple;
  beforeEach(() => {
    apple = new Apple();
  });
  it("should create", () => {
    expect(apple).to.not.be.undefined;
  });
  it("should spawn apple", () => {
    apple.spawn();
    expect(apple.x).to.be.a("number");
    expect(apple.y).to.be.a("number");
  });
});
