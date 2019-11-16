var express = require('express');
var process = require('process');
var app = express();
var bodyParser = require('body-parser');
var login = require('./routes/login')
var party = require('./routes/party')
var search = require('./routes/search')

app.use(bodyParser.json())

app.post('/login/vk', function (req, res) {
  login.vkLogin(req, res);
});

app.post('/login/guest', function (req, res) {
  login.guestLogin(req, res);
});

app.post('/party/create', function (req, res) {
  party.createParty(req, res);
});

app.get('/search/list', function (req, res) {
  party.listParties(req, res);
});

app.get('/search/location/:text', function (req, res) {
  search.searchLocation(req, res);
});

let port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('WeCoShop is running on port ' + port + '!');
});