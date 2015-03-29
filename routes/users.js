var express = require('express');
var pg = require('pg');

var router = express.Router();


var conString = "postgres://itai:123456@192.168.59.103/itai";
var createTable = 'CREATE TABLE Users(PersonID int,LastName varchar(255),FirstName varchar(255));';
var addNewUser = "INSERT INTO users VALUES (10,'itai','gendler');";

//Create the users table on start
pg.connect(conString, function(err, client, done) {
	if(err) {
		return console.error('error fetching client from pool', err);
	}
	client.query(createTable, function(err) {
		done();
		if(err && (err.toString()).indexOf("already exists") > -1) {
			console.log("Users table already exists");
		}
		else
			console.log("Created Users table");
		client.end();
	});
});


/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});


router.get('/register', function(req, res){
	pg.connect(conString, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(addNewUser, function(err, result) {
			//call `done()` to release the client back to the pool
			done();

			if(err) {
				console.log(err);
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
