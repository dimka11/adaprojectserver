const handler = require('serve-handler');
const http = require('http');
//const express = require("express");
//app.use(express.static(__dirname + "/public"));

let realTimeData;
let PORT = 8080;

const server = http.createServer((request, response) => {
  console.log('request was sent ' + request.url);
  if (request.url === '/putData') {
    // work with data from client
    request.on('data', (data) => {
      realTimeData = JSON.parse(data);
    })
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("");
  }

  else if (request.url === '/getRealTimeData') {
    // send data to frontend
    response.writeHead(200, { "Content-Type": "application/json" });
    let json = JSON.stringify(realTimeData);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(json);
  }
  else {
    return handler(request, response,
      {
        "public": "./static",
        "symlinks": true
      }).then(() => console.log(""));
  }
});

server.listen(PORT, () => {
  console.log('Running at http://localhost:' + PORT);
});

process.on('uncaughtException', function (err) {
  // This should not happen
  console.log(err);
});