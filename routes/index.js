var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/uploadfile', function(req, res, next) {
  console.log("11112222");
  console.log("*******************************");
  var body = req.body;
  const upload_folder = req.query.upload_folder;
  var form = new formidable.IncomingForm();
  var fileName = '';
  var tableName = '';
  var client = req.db;
  form.multiples = false;
  form.uploadDir = path.normalize(upload_folder);
  form.on('field', function (field, value) {
    console.log(field);
    console.log(value);

  });
  // every time a file has been uploaded successfully, rename it to it's orignal name
  form.on('file', function (field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name), function (err) {
      console.log("[pdf report upload func] Error renaming file. File name is " + file.name, err);
    });
  });
  // log any errors that occur
  form.on('error', function (err) {
    console.log('[*****ERR*****] An error has occured during PDF upload: \n' + err);
    res.end(err.toString());
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function (file) {
    res.end("SUCCESS");
  });
  // parse the incoming request containing the form data
  form.parse(req);
});

module.exports = router;
