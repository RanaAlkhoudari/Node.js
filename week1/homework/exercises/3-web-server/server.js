/**
 * Exercise 3: Create an HTTP web server
 */

var http = require("http");
const path = require("path");
const fs = require("fs");

//create a server
let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    const content = fs.readFileSync(path.join(__dirname, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(content);
    res.end();
  } else if (req.url === "/index.js") {
    const content = fs.readFileSync(path.join(__dirname, "index.js"));
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.write(content);
    res.end();
  } else if (req.url === "/style.css") {
    const content = fs.readFileSync(path.join(__dirname, "style.css"));
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(content);
    res.end();
  }
});

server.listen(3000); // The server starts to listen on port 30
