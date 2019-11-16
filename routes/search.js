
const credentials = require('../credentials')
const googleMapsClient = require('@google/maps').createClient({
  key: credentials.GOOGLE_MAPS_KEY
});

let search = {

  searchLocation(req, res) {
    console.log("Searching for", req.params.text)
    googleMapsClient.geocode({address: req.params.text}, function(err, response) {
      if (!err) {
        res.send(response.json.results.map(result => {
          return {
            name: result.formatted_address,
            lat: result.geometry.location.lat,
            lon: result.geometry.location.lon
          }
        }))
      } else {
        console.error("Error when geocoding", err)
        res.send([])
      }
    });
  },

  searchItem(req, res, productsApi) {
    productsApi.search(req, res);
}

}

module.exports = search