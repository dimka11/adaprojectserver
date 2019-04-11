// content of index.js
const http = require('http')
const fs = require('fs');
var dateToStr = require('./dateToStr');
var jsonToStr = require('./jsonToStr')
const port = 8080

filename = "data/" + "acc_data_" + dateToStr.getStringDate() + ".csv"
fs.appendFileSync(filename, 'timestamp,x,y,z \n', (err) => { if (err) console.log('error happend') })

const requestHandler = (request, response) => {
  console.log(request.url)
  request.on('data', function (data) {
    console.log(JSON.parse(data))

    let json_object = JSON.parse(data)
    let stringToWrite = jsonToStr(json_object);

    fs.appendFileSync(filename, stringToWrite, function (err) {
      if (err) {
        return console.log(err);
      }
    });

  })
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})