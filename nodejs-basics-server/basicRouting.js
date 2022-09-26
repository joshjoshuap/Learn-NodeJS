const http = require("http");
const fs = require("fs");

// creating routes
const basicRoute = (req, res) => {
  const pathName = req.url; // get url path
  const method = req.method; // get method request - POST, GET
  // send response based on url request
  if (pathName === "/") {
    res.write("<html>");
    res.write("<h1>Hello </h1>");
    res.write(
      '<body><form action="/add" method="POST"><input type="text" name="add"><input type="submit"></form></body>'
    );
    res.write("</html>");
    res.end(); // end the request
  }

  if (pathName === "/add" && method === "POST") {
    const body = [];
    // getting the data from request
    req.on("data", (chunk) => {
      body.push(chunk); // push data to array
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // convert the body data
      const message = parsedBody.split("=")[1]; // from inpu type name='message'
      fs.writeFileSync("sampleDB.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/"); // this will redirect to home after the button was clicked
        return res.end();
      });
     
    });
  }
};

const server = http.createServer(basicRoute);

// running server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
