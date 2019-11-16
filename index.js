var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var login = require('./routes/login')

app.use(bodyParser.json())

app.post('/login/vk', function (req, res) {
    login.vkLogin(req, res);
});

app.post('/login/guest', function (req, res) {
    login.guestLogin(req, res);
});

app.listen(8000, function () {
  console.log('WeCoShop is running on port 8000!');
});