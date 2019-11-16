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
      "mail TEXT, hashed_password TEXT, " + 
      "vk_id INTEGER, vk_user_id INTEGER, vk_token TEXT, " +
      "active_access_token TEXT)", [], (err) => {
        if (err) {
          console.log(err)
        }
      });
  }

  getUser(accessToken, tryCount=0) {
    console.log("TOKEN", accessToken)
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
          console.log("User not found for access token", accessToken, err)
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
          console.log("Found user:", row)
          resolve(row)
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