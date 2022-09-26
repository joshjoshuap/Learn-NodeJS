const http = require("http");

// create server using http
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader("Content-Type", "text/html");
  res.write('Hello World');
});

server.listen(3000);
