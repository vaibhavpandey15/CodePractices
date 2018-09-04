var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var passport =require('passport');
var social = require('./app/passport/passport')(app,passport);
app.use(morgan('dev'));
var express = require('express')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);


mongoose.connect('mongodb://localhost:27017/test', function (err) {
	if (err) {
		console.log("Something error");
	} else {
		console.log("Successfully connected to MongoDB");
	}
});

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
	//res.send("HelloU")
});

app.listen(port, function () {
	console.log("Running The Server................." + port);
});
//http://localhost:8080/api/user
