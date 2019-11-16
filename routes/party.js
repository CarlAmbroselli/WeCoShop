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

  listParties(req, res) {
    res.send([
      {
        partyId: 1,
        creatorUser: 4,
        name: "Christmas Bash",
        date: 1573893161,
        location: {
          name: "Buckingham Palace",
          lat: 1,
          lon: 1
        },
        headerPicture: "https://picsum.photos/400/500"
      },
      {
        partyId: 2,
        creatorUser: 4,
        name: "Rosa Queens",
        date: 1573893161,
        location: {
          name: "Buckingham Palace",
          lat: 1,
          lon: 1
        },
        headerPicture: "https://picsum.photos/400/500"
      }
    ]);
  }
};

module.exports = party;
