// strict
'use strict';

// requires
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// connect to heroku db
const { Pool, Client } = require('pg');
const connectionString = 'postgres://eisuyehwaxmocq:226e8b572a897541e5e3a0547c76423a6f5f9946a7421acd28e681a785e7cf51@ec2-107-20-188-239.compute-1.amazonaws.com:5432/dabp6c3coes58n';
const client = new Client({
	connectionString: connectionString
});

// other vars to be defined
var app, server;

app = express();
app.use(express.static('dist')); // statically server everything in the dist folder
app.use(bodyParser.json()); // bodyParser to get posts from $.ajax

app.get('/', function (req,res) {
	res.sendFile(path.join(__dirname + '/dist/index.html')); // serve our static index.html
});

// new_email endpoint for when a user posts to db
app.post('/new_email', function (req,res) {
	console.log(req.body.email);
	const query = {
		text: 'INSERT INTO emails(email) VALUES($1) RETURNING *',
		values: [req.body.email]
	}
	client.query(query, (err,res) => {
		if (err) {
			console.log(err.stack);
		} else {
			var response = {
			    status  : 200,
			    success : 'Email recorded successfully'
			}
			res.end(JSON.stringify(response));
		  console.log('Saved to DB!');
			console.log(res.rows[0]);
		}
	});
});


server = http.createServer(app);

// listening ports
server.listen(process.env.PORT || 8000);
