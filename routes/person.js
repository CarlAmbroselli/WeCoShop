let person = {
  getCurrentUser(req, res, db) {
    return new Promise((resolve, reject) => {
      db.getUser(req.cookies.access_token).then(user => {
        resolve(user)
      })
    })
  },

  sendCurrentUser(req, res, db) {
    person.getCurrentUser(req, res, db).then(user => {
      res.send({
        userId: user.id,
        vkId: user.vk_user_id,
        email: user.email,
        name: user.name,
        pictureUrl: user.pictureUrl
      })
    })
  }

}

module.exports = person