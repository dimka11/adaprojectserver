var MongoClient = require( 'mongodb' ).MongoClient;

var _db;
module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( "mongodb://localhost:27017/AccData",{ useNewUrlParser: true }, function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  },

  closeDB: ()=> _db.close()
};