var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    console.log(req.rawHeaders)
    var form = new formidable.IncomingForm();
    form.on("error", () => console.log("error happend"))
    form.parse(req, function (err, fields, files) {
      if (err) throw err;
      var oldpath = files.file.path
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
    });
  } else {
    console.log(req.rawHeaders)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080, () => {
  console.log('server running')
});