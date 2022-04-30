
const url = require("url");

const routesBasics2 = ((req, res) => {
  const pathName = req.url; // get url path
  if (pathName === "/") {
    res.write("Hello World");
    res.end();
  }

  if (pathName === "/about") {
    res.write("About page");
    res.end();
  }
});

module.exports = routesBasics2;