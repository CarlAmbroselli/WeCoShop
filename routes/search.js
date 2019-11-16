let search = {

  searchLocation(req, res) {
    res.send({
      name: req.params.text,
      lat: 60.1733244,
      lon: 24.9410248
    })
  },

  searchItem(req, res) {
    req.send([
      {
          id: 1,
          name: "Tank Top",
          pictureUrl: "https://picsum.photos/50/50",
          price: 12,
          currency: "EUR"
      },
      {
          id: 2,
          name: "Jeans",
          pictureUrl: "https://picsum.photos/50/50",
          price: 12,
          currency: "EUR"
      }
    ])
}

}

module.exports = search