const { queryString } = require("./queryString");

describe("Object to query string", () => {
  it("should be create a query string when object is provide", () => {
    const obj = {
      name: "italo",
      profession: "development",
    };

    expect(queryString(obj)).toBe("name=italo&profession=development");
  });
});
