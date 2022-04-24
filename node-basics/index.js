const fs = require("fs"); // file system

// const name = "Joshua Pautanes";
// console.log(name);

// // Blocking
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8"); // read file input.txt

// const textOutput = `Avocado: ${textInput} - Created(${Date.now()})`;
// fs.writeFileSync('txt/output.txt', textOutput); // write and create output.txt file

// Asynchronous (Callback)
fs.readFile("txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2) // this play data in read-this.txt
  }); // txt/read-this.txt
});
console.log("Read First");
