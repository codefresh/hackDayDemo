var express = require('express');
var pg = require('pg');

var router = express.Router();


var conString = "postgres://username:password@localhost/database";
var createTable = 'CREATE TABLE Persons(PersonID int,LastName varchar(255),FirstName varchar(255));';


/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});


router.get('/register', function(req, res){
	pg.connect(conString, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(createTable, function(err, result) {
			//call `done()` to release the client back to the pool
			done();

			if(err) {
				return res.send('error', err);
			}
			//console.log(result.rows[0].number);
			//output: 1
			client.end();
			res.send('finished');
		});
	});
});




module.exports = router;
