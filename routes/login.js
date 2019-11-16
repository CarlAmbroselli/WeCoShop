const request = require('request');
const credentials = require('../credentials')

let APP_ID = credentials.VK_APP_ID;
let APP_SECRET = credentials.VK_APP_SECRET
let REDIRECT_URI = credentials.VK_REDIRECT_URI

let login = {

  authenticate(req, res) {
    if (!req.body.callbackUrl) {
      res.send("You need to specify a callbackUrl. See https://github.com/CarlAmbroselli/WeCoShop");
    }
    res.redirect(req.body.callbackUrl)
  },

  vkCodeResponse(req, res) {
    let code = req.query.code;
    request(`https://oauth.vk.com/access_token?` +
        `client_id=${APP_ID}&` +
        `client_secret=${APP_SECRET}&` + 
        `code=${code}&` +
        `redirect_uri=${REDIRECT_URI}`, function (error, response, body) {
            let authToken = JSON.parse(response.body)
            console.log("Access Token: ", authToken)
    })
  },

  vkFlow(req, res, db) {
    db.getUser(req.cookies.access_token).then(user => {
        console.log(user)
        res.send(user)
    })
  },

  vkLogin(req, res) {
    res.redirect("https://oauth.vk.com/authorize?" +
        `client_id=${APP_ID}&` +
        `scope=friends,photos,offline&` +
        `redirect_uri=${REDIRECT_URI}&` +
        `response_type=code&` +
        `v=5.103`
    )
    login.authenticate(req, res);
  },

  guestLogin(req, res) {
    login.authenticate(req, res);
  }
}

module.exports = login;