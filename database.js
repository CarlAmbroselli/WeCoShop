var sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    // this.db = new sqlite3.Database(':memory:');
    this.db = new sqlite3.Database('data.sqlite');
    this.init()

  }

  shutdown() {
    this.db.close()
  }

  all(query, params=[], callback=()=>{}) {
    this.db.all(query, params, callback)
  }

  query(query, params=[], callback=()=>{}) {
    this.db.run(query, params, callback)
  }

  getFirst(query, params, callback) {
    this.db.get(query, params, callback)
  }

  init() {
    this.query("CREATE TABLE IF NOT EXISTS user " + 
      "(userId INTEGER PRIMARY KEY, name TEXT, " +
      "email TEXT, hashed_password TEXT, " + 
      "vk_user_id INTEGER, vk_token TEXT, " +
      "active_access_token TEXT, pictureUrl TEXT)", [], (err) => {
        if (err) {
          console.log(err)
        }
      });
    
    this.query("CREATE TABLE IF NOT EXISTS party " + 
      "(partyId INTEGER PRIMARY KEY, creator_user INTEGER, " +
      "name TEXT, location_name TEXT, location_lat REAL, " +
      "location_lon REAL, date INTEGER, " + 
      "header_picture TEXT, hash TEXT, category TEXT)", [], (err) => {
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
      this.getFirst("SELECT * FROM user WHERE vk_user_id = $vkUserId AND active_access_token = $token", {
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

  getParty(hash) {
    return new Promise((resolve, reject) => {
      this.getFirst("SELECT * FROM party WHERE hash = $hash", {
        $hash: hash
      }, (err, row) => {
        if (err) {
          reject()
        } else {
          resolve(row)
        }
      })
    })
  }

  getAllParties(creatorUserId) {
    return new Promise((resolve, reject) => {
      this.all("SELECT * FROM party WHERE creator_user = $creatorUserId", {
        $creatorUserId: creatorUserId
      }, (err, res) => {
        if (err) {
          console.log("Error reading all parties:", err)
        }
        console.log(res)
        resolve(res)
      })
    })
  }

  createParty(party) {
    console.log("Party to create:", party)
    let hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return new Promise((resolve, reject) => {
      this.query("INSERT INTO party (creator_user, name, " + 
      "location_name, location_lat, " +
      "location_lon, date, header_picture, hash, category) " +
      "VALUES ($creator_user, $name, $location_name, " +
      "$location_lat, $location_lon, " + 
      "$date, $header_picture, $hash, $category)", {
        $creator_user: party.creatorUser,
        $name: party.name,
        $location_name: party.location.name,
        $location_lat: party.location.lat,
        $location_lon: party.location.lon,
        $date: party.date,
        $header_picture: party.headerPicture,
        $hash: hash,
        $category: party.category
      }, (err, res) => {
        if (err) {
          console.log("Error creating party:", err)
        }
        resolve(this.getParty(hash))
      })
    })
  }
}

module.exports = Database