var person = require('./person')

let party = {
  createParty(req, res, db) {
    let party = req.body
    person.getCurrentUser(req, res, db).then(user => {
        db.createParty({
            creatorUser: user.userId,
            name: party.name,
            location: party.location,
            date: party.date,
            category: party.category,
            headerPicture: party.headerPicture
        }).then(party => {
            console.log(party)
            res.send(party)
        })
    })
  },

  listParties(req, res, db) {
    person.getCurrentUser(req, res, db).then(user => {
        db.getAllParties(user.userId).then(parties => {
            res.send(parties)
        })
    })
  }
};

module.exports = party;
