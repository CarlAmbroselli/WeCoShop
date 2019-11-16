var express = require('express');
var process = require('process');
var app = express();
var cors = require('cors')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var login = require('./routes/login')
var party = require('./routes/party')
var search = require('./routes/search')

var Database = require('./database')
var db = new Database();

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

function randomString() {
    return Math.random().toString(36).substring(2, 15) 
    + Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15);
}

app.use(function (req, res, next) {
  let cookies = req.cookies;
  if (!cookies.access_token) {
    let token = randomString();
    res.cookie('access_token', token)
    req.cookies = {
        access_token: token
    }
  }
  console.log("Cookies:", cookies)
  next();
});

app.post('/api/v1/login/vk', function (req, res) {
  login.vkFlow(req, res, db);
});

app.get('/api/v1/oauth/vk', function (req, res) {
    login.vkCodeResponse(req, res)
})

app.post('/api/v1/login/guest', function (req, res) {
  login.guestLogin(req, res);
});

app.post('/api/v1/party/create', function (req, res) {
  party.createParty(req, res);
});

app.get('/api/v1/party/list', function (req, res) {
  party.listParties(req, res);
});

app.get('/api/v1/search/item/:search', function (req, res) {
  search.searchItem(req, res);
});

app.get('/api/v1/search/location/:text', function (req, res) {
  search.searchLocation(req, res);
});

let port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('WeCoShop is running on port ' + port + '!');
});