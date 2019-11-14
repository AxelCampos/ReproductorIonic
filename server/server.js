var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var fs = require('fs');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.post('/latest', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/search-latest.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/search-latest.json');
		var latest = JSON.parse(rawdata);
		res.send(latest);
	} else {
		res.send([]);
	}
});

app.post('/checkname', function(req, res) {
	if (req.body.name.toLowerCase() === 'homer') {
		res.status(401).send({ message: "Sorry, no Homer's!" });
	} else {
		res.send({
			passed: true,
			message: 'Welcome, friend!'
		});
	}
});

app.get('/checkname/:name', function(req, res) {
	if (req.params.name.toLowerCase() === 'homer') {
		res.status(401).send({ message: "Sorry, no Homer's!" });
	} else {
		res.json('Welcome!');
	}
});

app.put('/push-item', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/search-latest.json')) {
		console.log('The file exists');
		var rawdata = fs.readFileSync('../ionizate/src/json/search-latest.json');
		latest = JSON.parse(rawdata);
		latest.push(req.body);
		fs.writeFileSync('../ionizate/src/json/search-latest.json', JSON.stringify(latest));
	} else {
		console.log('The file no exists');
		var arrayLatest = [];
		arrayLatest.push(req.body);
		var data = JSON.stringify(arrayLatest);
		fs.writeFileSync('../ionizate/src/json/search-latest.json', data);
	}
});

app.listen(process.env.PORT || 8080);
