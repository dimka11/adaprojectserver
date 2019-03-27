const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: '/upload'});

var fs = require('fs');

var type = upload.single('test.csv');

app.post('/uploadFile', type, function (req, res, next) {
  // req.body contains the text fields 
    req.on('data', () => console.log(req.body))
  
  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
      var tmp_path = req.file.path;

      /** The original name of the uploaded file
          stored in the variable "originalname". **/
      var target_path = 'B:/Cache/' + req.file.originalname;
    
      /** A better way to copy the uploaded file. **/
      var src = fs.createReadStream(tmp_path);
      var dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on('end', function() { res.render('complete');
    console.log ("end") });
      src.on('error', function(err) { res.render('error');
    console.log("error") });

});

app.post('/', () => console.log ('JSON was sended'))

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})