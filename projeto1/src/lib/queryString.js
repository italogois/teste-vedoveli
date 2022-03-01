module.exports.queryString = (obj) => {
  const arr = Object.entries(obj).map((item) => `${item[0]}=${item[1]}`);

  return arr.join("&");
};
