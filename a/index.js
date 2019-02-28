// content of index.js
const http = require('http')
const fs = require('fs');
const port = 8080

const requestHandler = (request, response) => {
  console.log(request.url)
  request.on('data', function (data) {
    console.log(JSON.parse(data))

    fs.appendFileSync("acc_data.json", data, function(err) {
      if(err) {
          return console.log(err);
      }
  }); 

  fs.appendFileSync("acc_data.json", " \n", function(err) {
    if(err) {
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