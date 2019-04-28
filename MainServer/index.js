const handler = require('serve-handler');
const http = require('http');
const fs = require('fs');
var formidable = require('formidable');

var dateToStr = require('./dateToStr');
var jsonToStr = require('./jsonToStr')
//const express = require("express"); // serve static with express
//app.use(express.static(__dirname + "/public"));

let realTimeData;
let PORT = 8080;
let uploadedFilesFolder = 'C:/VSI/';

let filename = "data/" + "acc_data_" + dateToStr.getStringDate() + ".csv";

//fs.appendFileSync(filename, 'timestamp,x,y,z \n', (err) => { if (err) console.log('error happend') }) // with timestamp 
fs.open(filename, "wx", function (err, fd) {
  // handle error
  fs.close(fd, function (err) {
    // handle error
  });
});

http.createServer((req, res) => {
  console.log('req was sent ' + req.url);

  if (req.url == '/fileupload') {
    console.log(req.rawHeaders);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) throw err;
      var oldpath = files.file.path;
      var newpath = 'C:/VSI/' + files.file.name;
      fs.rename(oldpath, newpath, function (err) {
        //if (err) throw err;
        //res.write('File uploaded and moved!');
        if (err) {
          res.write(JSON.stringify({
            success: false,
            message: 'error happend'
          })
          );
          res.end()
          throw err;
        }

        res.write(JSON.stringify({
          success: true,
          message: 'Successfully Uploaded'
        })
        );
        res.end();
      });
    }).on('error', () => 'error happend');
  }

  else if (req.url === '/putDataCSV') {
    req.on('data', function (data) {
      //console.log(JSON.parse(data))

      let json_object = JSON.parse(data)
      let stringToWrite = jsonToStr(json_object, filename);

      fs.appendFileSync(filename, stringToWrite, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Hello Node.js Server!')
  }

  else if (req.url === '/putData') {
    // work with data from client
    req.on('data', (data) => {
      realTimeData = JSON.parse(data);
    })
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("");
  }

  else if (req.url === '/getRealTimeData') {
    // send data to frontend
    res.writeHead(200, { "Content-Type": "application/json" });
    let json = JSON.stringify(realTimeData);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(json);
  }
  else {
    return handler(req, res,
      {
        "public": "./static",
        "symlinks": true
      }).then(() => console.log(""));
  }
}).listen(PORT, () => {
  console.log('Running at http://localhost:' + PORT);
});;

process.on('uncaughtException', function (err) {
  // This should not happen
  console.log(err);
});