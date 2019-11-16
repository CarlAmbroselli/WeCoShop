var sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database(':memory:');
    this.init()
  }

  query(query, params=[], callback=()=>{}) {
    this.db.run(query, params, callback)
  }

  getFirst(query, params, callback) {
    this.db.get(query, params, callback)
  }

  init() {
    this.query("CREATE TABLE user " + 
      "(id INTEGER PRIMARY KEY, name TEXT, " +
      "email TEXT, hashed_password TEXT, " + 
      "vk_user_id INTEGER, vk_token TEXT, " +
      "active_access_token TEXT, pictureUrl TEXT)", [], (err) => {
        if (err) {
          console.log(err)
        }
      });
  }

  getUser(accessToken, tryCount=0) {
    return new Promise((resolve, reject) => {
      this.getFirst("SELECT * FROM user WHERE active_access_token = $token", {
        $token: accessToken
      }, (err, row) => {
        if (err || tryCount > 2) {
          console.log("Failed to create user", err)
          reject("Failed to create user")
          return; 
        }
        if (!row) {
          console.log("User not found for access token, creating.", accessToken)
          if (err) {
            console.error(err)
          }
          this.query("INSERT INTO user (active_access_token) VALUES ($token)", {
            $token: accessToken
          }, (err) => {
            if (err) {
              console.error("Error creating user:", err)
              reject("Error creating user")
              return;
            }
            resolve(this.getUser(accessToken, (tryCount+1)))
          })
        } else {
          // console.log("Found user:", row)
          resolve(row)
        }
      })
    })
  }

  storeVkToken(accessToken, vkId, vkToken) {
    return new Promise((resolve, reject) => {
      this.query("UPDATE user SET vk_user_id = $vkId, vk_token = $vkToken WHERE active_access_token = $accessToken", {
        $accessToken: accessToken,
        $vkId: vkId,
        $vkToken: vkToken
      }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  vkGetUser(vkUserId, accessToken) {
    return new Promise((resolve, reject) => {
      this.getFirst("SELECT * FROM users WHERE vk_user_id = $vkUserId AND active_access_token = $token", {
        $token: accessToken,
        $vkUserId: vkUserId
      }, (err, row) => {
        if (err) {
          reject()
        } else {
          resolve(row)
        }
      })
    })
  }

  vkLoginUser(user, accessT) {
    this.getFirst("SELECT * FROM users WHERE vk_user_id = $vkUserId", {
      vkUserId: user.vkUserId
    }, (err, row) => {
      if (err) {
        this.query("INSERT INTO users VALUES (?)")
      }
    })
  }
}

module.exports = Database