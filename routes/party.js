var person = require('./person')

let party = {
  createParty(req, res, db) {
    let party = req.body;
    console.log("Party i received", party)
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
  },

  addPartyItem(req, res, db) {
    db.addPartyItem(req.params.partyId, req.body).then(() => {
        res.send({ "success": true })
    })
  },

  getPartyDetails(req, res, db) {
      db.getPartyItems(req.params.partyId).then((items) => {
        db.getPartyById(req.params.partyId).then((party) => {
        
        res.send({
            details: {
                partyId: party.partyId,
                creatorUser: party.creator_user,
                name: party.name,
                date: party.date,
                location: {
                    name: party.location_name,
                    lat: party.location_lat,
                    lon: party.location_lon
                },
                category: party.category,
                header_picture: party.header_picture
            },
            items: items
        })
      })
    })
  }
};

module.exports = party;
