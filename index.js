var express = require('express');
var process = require('process');
var app = express();
var cors = require('cors')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var login = require('./routes/login')
var party = require('./routes/party')
var search = require('./routes/search')
var person = require('./routes/person')
var credentials = require('./credentials')

var Database = require('./database')
var db = new Database();

var ProductsApi = require('./productsApi')
var productsApi = new ProductsApi();

app.use(bodyParser.json())
app.use(cors({
    origin: credentials.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
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

app.get('/api/v1/login/vk', function (req, res) {
  login.vkFlow(req, res, db);
});

app.get('/api/v1/oauth/vk', function (req, res) {
  login.vkCodeResponse(req, res, db)
})

app.post('/api/v1/login/guest', function (req, res) {
  login.guestLogin(req, res);
});

app.get('/api/v1/me', function (req, res) {
  person.sendCurrentUser(req, res, db);
});

app.post('/api/v1/party/create', function (req, res) {
  party.createParty(req, res, db);
});

app.get('/api/v1/party/list', function (req, res) {
  party.listParties(req, res, db);
});

app.get('/api/v1/search/item/:search/:page', function (req, res) {
  search.searchItem(req, res, productsApi);
});

app.get('/api/v1/search/location/:text', function (req, res) {
  search.searchLocation(req, res);
});

let port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('WeCoShop is running on port ' + port + '!');
});

process.on('exit', function() {
    productsApi.shutdown();
    db.shutdown();
});