

app.post('/latest', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/search-latest.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/search-latest.json');
		var latest = JSON.parse(rawdata);
		res.send(latest);
	} else {
		res.send([]);
	}
});

app.post('/following', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/following.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/following.json');
		var latest = JSON.parse(rawdata);
		res.send(latest);
	} else {
		res.send([]);
	}
});

app.post('/saved', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/albums-saved.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/albums-saved.json');
		var latest = JSON.parse(rawdata);
		res.send(latest);
	} else {
		res.send([]);
	}
});

app.post('/push-item', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/search-latest.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/search-latest.json');
		latest = JSON.parse(rawdata);
		latest.push(req.body);
		fs.writeFileSync('../ionizate/src/json/search-latest.json', JSON.stringify(latest));
	} else {
		var arrayLatest = [];
		arrayLatest.push(req.body);
		var data = JSON.stringify(arrayLatest);
		fs.writeFileSync('../ionizate/src/json/search-latest.json', data);
	}
});

app.post('/follow-artist', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/following.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/following.json');
		latest = JSON.parse(rawdata);
		latest.push(req.body);
		fs.writeFileSync('../ionizate/src/json/following.json', JSON.stringify(latest));
	} else {
		var arrayLatest = [];
		arrayLatest.push(req.body);
		var data = JSON.stringify(arrayLatest);
		fs.writeFileSync('../ionizate/src/json/following.json', data);
	}
});
app.post('/save-album', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/albums-saved.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/albums-saved.json');
		latest = JSON.parse(rawdata);
		latest.push(req.body);
		fs.writeFileSync('../ionizate/src/json/albums-saved.json', JSON.stringify(latest));
	} else {
		var arrayLatest = [];
		arrayLatest.push(req.body);
		var data = JSON.stringify(arrayLatest);
		fs.writeFileSync('../ionizate/src/json/albums-saved.json', data);
	}
});

app.delete('/delete-item', function(req, res) {
	if (fs.existsSync('../ionizate/src/json/search-latest.json')) {
		var rawdata = fs.readFileSync('../ionizate/src/json/search-latest.json');
		latest = JSON.parse(rawdata);
		latest.shift();
		fs.writeFileSync('../ionizate/src/json/search-latest.json', JSON.stringify(latest));
	}
});
app.put('/remove-item', function (req, res){
	var items = req.body;
	fs.writeFileSync('../ionizate/src/json/search-latest.json', JSON.stringify(items));
});
*/
/*

app.listen(process.env.PORT || 8081);
*/