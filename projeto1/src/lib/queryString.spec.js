const { queryString, parse } = require("./queryString");

describe("Object to query string", () => {
  it("should be create a query string when object is provide", () => {
    const obj = {
      name: "italo",
      profession: "development",
    };

    expect(queryString(obj)).toBe("name=italo&profession=development");
  });

  it("should be create a query string when array is value", () => {
    const obj = {
      name: "italo",
      skills: ["js", "html"],
    };

    expect(queryString(obj)).toBe("name=italo&skills=js,html");
  });

  it("should be throw when in object has object", () => {
    const obj = {
      name: "italo",
      skills: { first: "js", second: "html" },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});

describe("query String to Object", () => {
  it("should be convet query string to object", () => {
    const queryString = "name=italo&profession=development";

    expect(parse(queryString)).toMatchObject({
      name: "italo",
      profession: "development",
    });
  });

  it("should be convet query string to object with one key-value", () => {
    const queryString = "name=italo";

    expect(parse(queryString)).toMatchObject({
      name: "italo",
    });
  });

  it("should be convet query string to object with comma operator in value", () => {
    const queryString = "name=italo&skills=js,html";

    expect(parse(queryString)).toMatchObject({
      name: "italo",
      skills: ["js", "html"],
    });
  });
});
