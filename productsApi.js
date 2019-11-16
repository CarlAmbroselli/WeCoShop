const { Client } = require('pg');
var credentials = require('./credentials.js')

var connectionString = credentials.POSTGRES_CONNECTION_STRING

class ProductsApi {
  constructor() {
      this.client = new Client({
        connectionString: connectionString
    });
    this.client.connect();
  }

  search(req, res) {
    var search = req.params.search.split(' ')
    var page = parseInt(req.params.page)
    var query = 'SELECT * FROM product where LOWER("productDisplayName") LIKE LOWER($1)';
    for (var i = 1; i < search.length; i++) {
      query = query + ' AND LOWER("productDisplayName") LIKE $' + (i+1)
    }

    var pageSize = 25;

    search = search.map(x => '%' + x + '%')
    query = query + ' OFFSET ' + (pageSize * page) + ' LIMIT ' + pageSize

    this.client.query(query, search, function (err, result) {
      if (err) {
          console.log(err);
          res.status(400).send(err);
      }
      console.log(result)
      res.status(200).send(result.rows);
  });
  }

  shutdown() {
    this.client.close()
  }
}

module.exports = ProductsApi