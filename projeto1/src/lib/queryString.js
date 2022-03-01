module.exports.queryString = (obj) => {
  const arr = Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        throw new Error("Invalid params");
      }

      return `${key}=${value}`;
    })
    .join("&");

  return arr;
};

module.exports.parse = (qs) => {
  const qsSplit = qs.split("&").map((item) => {
    let [key, value] = item.split("=");

    if (value.includes(",")) {
      value = value.split(",");
    }

    return [key, value];
  });
  const obj = Object.fromEntries(qsSplit);

  return obj;
};
