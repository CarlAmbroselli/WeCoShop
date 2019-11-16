var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var login = require('./routes/login')

app.use(bodyParser.json())

app.post('/login/vk', function (req, res) {
    login(req, res);
});

app.listen(3000, function () {
  console.log('WeCoShop is running on port 3000!');
});