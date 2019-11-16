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
    });
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
