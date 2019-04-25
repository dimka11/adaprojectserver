const handler = require('serve-handler');
const http = require('http');
const fs = require('fs');

var dateToStr = require('./dateToStr');
var jsonToStr = require('./jsonToStr')
//const express = require("express"); // serve static with express
//app.use(express.static(__dirname + "/public"));

let realTimeData;
let PORT = 8080;

let filename = "data/" + "acc_data_" + dateToStr.getStringDate() + ".csv";

//fs.appendFileSync(filename, 'timestamp,x,y,z \n', (err) => { if (err) console.log('error happend') }) // with timestamp 
fs.open(filename, "wx", function (err, fd) {
  // handle error
  fs.close(fd, function (err) {
      // handle error
  });
});

const server = http.createServer((request, response) => {
  console.log('request was sent ' + request.url);
  if (request.url === '/putDataCSV') {
    request.on('data', function (data) {
      //console.log(JSON.parse(data))
      
      let json_object = JSON.parse(data)
      let stringToWrite = jsonToStr(json_object, filename);
  
      fs.appendFileSync(filename, stringToWrite, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end('Hello Node.js Server!')
  }

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