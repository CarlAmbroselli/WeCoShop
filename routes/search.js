
let search = {

  searchLocation(req, res) {
    res.send({
      name: req.params.text,
      lat: 60.1733244,
      lon: 24.9410248
    })
  },

  searchItem(req, res, productsApi) {
    productsApi.search(req, res);
}

}

module.exports = search