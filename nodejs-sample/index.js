const fs = require("fs"); // file system
const http = require("http"); // http server
const url = require("url"); // url parser

// // Basics
// const name = "Joshua Pautanes";
// console.log(name);

// // Blocking
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8"); // read file input.txt

// const textOutput = `Avocado: ${textInput} - Created(${Date.now()})`;
// fs.writeFileSync('txt/output.txt', textOutput); // write and create output.txt file

// // Asynchronous (Callback)
// fs.readFile("txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2) // this play data in read-this.txt
//   }); // txt/read-this.txt
// });
// console.log("Read First");

// Web Server
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); // replace %PRODUCTNAME% in product.html to product.productName in data.json
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  if (product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "");

  return output;
};

const home = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); // get the query and pathname of the url request
  console.log(query);

  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj.map((el) => replaceTemplate(card, el)); // loop through data.json and replace template-card.html with data.json
    const output = home.replace("{%PRODUCT_CARDS%}", cardsHtml); // change the home(overview.html) to cardsHtml
    res.end(output); // overview.html
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id]; // get the product from data.json
    const output = replaceTemplate(productTemplate, product); // replace the product.html with product.json
    res.end(output);
  } else {
    res.writeHead(404, { "Content-type": "text/html" }); // set the status code to 404
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is running on port 5000");
});
