const http = require('http');
var mongoose = require('mongoose');

var accDataSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  timestamp: Number,
  sensors: [Object]
});

var accDataModel = mongoose.model("AccData", accDataSchema);
let time_delta = 0

mongoose.connect('mongodb://localhost/AccData', (err) => {

  const requestHandler = (request, response) => {
    console.log(request.url)
    request.on('data', function (data) {
      console.log(JSON.parse(data));
      let json_object = JSON.parse(data);
      timeDelta(json_object.timestamp);
      let newAccData = new accDataModel({
        _id: new mongoose.Types.ObjectId(),
        timestamp: json_object.timestamp,
        sensors: json_object.sensors
      });
      newAccData.save((err)=>{
        if (err) {
          console.log('error' + err);
          return;
        } 
        console.log('successfully saved');
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

process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});

function timeDelta(timestamp) {
  let delta = timestamp - time_delta;
  let time = new Date(delta);
  console.log("refresh rate: " + 1000 / delta);
  time_delta = timestamp;
}
