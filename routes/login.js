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

  vkCodeResponse(req, res, db) {
    let code = req.query.code;
    request(`https://oauth.vk.com/access_token?` +
        `client_id=${APP_ID}&` +
        `client_secret=${APP_SECRET}&` + 
        `code=${code}&` +
        `redirect_uri=${REDIRECT_URI}&callbackUr`, function (error, response, body) {
            let authToken = JSON.parse(response.body)
            console.log("VK Access Token: ", authToken)
            db.storeVkToken(req.cookies.access_token, authToken.user_id, authToken.access_token).then(() => {
                res.redirect(credentials.POST_LOGIN_REDIRECT);
            })
    })
  },

  vkFlow(req, res, db) {
    db.getUser(req.cookies.access_token).then(user => {
        console.log(user)
        if (!user.vk_user_id) {
            this.vkLogin(req, res);
        } else {
            res.redirect(credentials.POST_LOGIN_REDIRECT);
        }
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
  },

  guestLogin(req, res) {
    login.authenticate(req, res);
  }
}

module.exports = login;