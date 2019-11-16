let party = {
  createParty(req, res) {
    res.send({
      partyId: 3,
      creatorUser: 4,
      name: req.body.name,
      date: req.body.date,
      location: {
        name: req.body.location.name,
        lat: req.body.location.lat,
        lon: req.body.location.lon
      }
    })
  }
}

module.exports = party