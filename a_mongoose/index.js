const http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');

var accDataSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  timestamp: Number,
  sensors: [Object]
});

var accDataModel = mongoose.model("AccData", accDataSchema);
let time_delta = 0
/**
 * @type {Array}
 */
let requests_array = [];

mongoose.connect('mongodb://localhost/AccData', { useNewUrlParser: true }, (err) => {

  const requestHandler = (request, response) => {
    //console.log(request.url)

    request.on('data', function (data) {
      //console.log(JSON.parse(data));
      let json_object = JSON.parse(data);
      requests_array.push(json_object)
      timeDelta(json_object.timestamp);
      let newAccData = new accDataModel({
        _id: new mongoose.Types.ObjectId(),
        timestamp: json_object.timestamp,
        sensors: json_object.sensors
      });
      newAccData.save((err) => {
        if (err) {
          console.log('error' + err);
          return;
        }
        //console.log('successfully saved');
      });

    });
    response.end('Accelerometer Data Write Node.js Server!')
  }

  const server = http.createServer(requestHandler);
  const port = 8080;
  server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`);
  });
});

/**
 * write to disk with 1 second interval
 */
(function repeatedConsoleLogger() {
  setInterval(() => {
    console.log(requests_array.length);
    fs.appendFile("test.json", JSON.stringify(requests_array), (err) => {
      if (err) console.log(err);
      requests_array = []
    })
  }, 1000)
});

(function repeatedConsoleLoggerPromise() {
  const util = require('util');
  fs.appendFile = util.promisify(fs.appendFile);
  setInterval(() => {
    console.log(requests_array.length);
    fs.appendFile("test.json", JSON.stringify(requests_array))
      .then(() => {
        requests_array = [];
      })
      .catch((err) => { console.log(err) })
  }, 1000)
});

(function repeatedConsoleLoggerAsync() {
  const util = require('util');
  fs.appendFile = util.promisify(fs.appendFile);
   setInterval(async () => {
    console.log(requests_array.length);
    let err = await fs.appendFile("test.json", JSON.stringify(requests_array));
    if (err) console.log(err);
    requests_array = [];
  }, 1000)
})();

/*
const fsPromises = fs.promises;
async function listDir() {
  try {
    return await fsPromises.readdir('path/to/dir');
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
}
listDir();
*/


process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});

function timeDelta(timestamp) {
  let delta = timestamp - time_delta;
  let time = new Date(delta);
  //console.log("refresh rate: " + 1000 / delta);
  time_delta = timestamp;
}
