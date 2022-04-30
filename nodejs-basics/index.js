const http = require("http");

const routes = require("./basics2");

const server = http.createServer(routes);

// running server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
