const http = require('http')
var mongoUtil = require('./mongoUtil');

let time_delta = 0

mongoUtil.connectToServer((err) => {
  const requestHandler = (request, response) => {
    console.log(request.url)
    request.on('data', function (data) {
      console.log(JSON.parse(data))
      let json_object = JSON.parse(data)
      timeDelta(json_object.timestamp)
      var database = mongoUtil.getDb();
      const collection = database.db().collection('DataCollector').insertOne(json_object, (err, result) => {
      });
    })
    response.end('Accelerometer Data Write Node.js Server!')
  }

  const server = http.createServer(requestHandler)
  const port = 8080
  server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
  })
});


process.on( 'SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  mongoUtil.closeDB()
  process.exit( );
})

function timeDelta(timestamp) {
  let delta = timestamp - time_delta
  let time = new Date(delta)
  console.log("refresh rate: " + 1000 / delta)
  time_delta = timestamp
}