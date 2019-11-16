let login = {

  authenticate(req, res) {
    if (!req.body.callbackUrl) {
      res.send("You need to specify a callbackUrl. See https://github.com/CarlAmbroselli/WeCoShop");
    }
    res.redirect(req.body.callbackUrl)
  },

  vkLogin(req, res) {
    login.authenticate(req, res);
  },

  guestLogin(req, res) {
    login.authenticate(req, res);
  }
}

module.exports = login;