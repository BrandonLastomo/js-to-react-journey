const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" }); // display html el
    // res.write("Hello World"); // display text
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.writeHead("404");
        res.write("file not found");
      } else {
        res.write(data);
      }
      res.end();
    });
  })
  .listen(3000, () => {
    console.log("Listen to server 3000");
  });
