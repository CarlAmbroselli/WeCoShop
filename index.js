var express = require('express');
var process = require('process');
var app = express();
var bodyParser = require('body-parser');
var login = require('./routes/login')
var party = require('./routes/party')
var search = require('./routes/search')


app.use(bodyParser.json())

app.post('/api/v1/login/vk', function (req, res) {
  login.vkLogin(req, res);
});

app.post('/api/v1/login/guest', function (req, res) {
  login.guestLogin(req, res);
});

app.post('/api/v1/party/create', function (req, res) {
  party.createParty(req, res);
});

app.get('/api/v1/party/list', function (req, res) {
  party.listParties(req, res);
});

app.get('/api/v1/search/location/:text', function (req, res) {
  search.searchLocation(req, res);
});

let port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('WeCoShop is running on port ' + port + '!');
});