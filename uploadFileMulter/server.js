var express = require('express')
var multer = require('multer')
var app = express()
var path = require('path')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
})

app.use(express.static('public'));

app.post('/fileupload', upload.single('file'), function(req, res) {
    res.write(JSON.stringify({
    success: true,
     message: 'Successfully Uploaded'
     })
     );
    //res.send(200);
    res.end();
})

var server = app.listen(8080, function() {})