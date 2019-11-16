module.exports = {
    vkLogin(req, res) {
        res.redirect(req.body.callbackUrl)
    }
}