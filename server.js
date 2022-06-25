var express = require('express');
var cors = require('cors');
const multer = require("multer");
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


var upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", upload.single("upfile"), function(request, response, next) {
  var upfile = request.file;
  if (typeof upfile === "undefined"){
   response.json({ error: "file not uploaded" });
}
  return response.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});