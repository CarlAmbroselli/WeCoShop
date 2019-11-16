let person = {
  getCurrentUser(req, res, db) {
    db.getUser(req.cookies.access_token).then(user => {
        res.send({
            userId: user.id,
            vkId: user.vk_user_id,
            email: user.email,
            name: user.name,
            pictureUrl: user.pictureUrl
        })
    })
  },

}

module.exports = person