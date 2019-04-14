const handler = require('serve-handler');
const http = require('http');
//const express = require("express");
//app.use(express.static(__dirname + "/public"));

const server = http.createServer((request, response) => {
   return  handler(request, response,
    {
        "public": "./static",
        "symlinks": true
    }).then(()=> console.log('request '));
});
 
server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});

process.on('uncaughtException', function (err) {
    // This should not happen
    console.log(err);
  });