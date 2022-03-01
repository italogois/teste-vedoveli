const { sum } = require("./calculator");

it("should sum 2 and 2 and the result must be 4", () => {
  expect(sum(2, 2)).toBe(4);
});

it("should sum 2 and 2 even if one of them is string the result must be 4", () => {
  expect(sum("2", "2")).toBe(4);
});

it("should be throw error if has invalid arguments", () => {
  expect(() => sum("", 2)).toThrowError();
});
