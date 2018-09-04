var express = require('express');
var app = express();
var port =process.env.PORT || 8000;
var mongoose =require('mongoose');
var User = require('./app/model/user')
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',function (req,res) {
  res.send("Hello");
})
mongoose.connect('mongodb://localhost:27017/login',function (err) {
  if (err) {
       console.log("Something error");
   } else {
       console.log("Successfully connected to MongoDB");
   }
});
app.post('/user',function (req,res) {
  var user = new User();
	user.username =req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""){
		res.send("Check all the entery and enter properly");
	}
	else{
	user.save(function(err){
		if(err){
			res.send("Data exist");
		}else{
			res.send("Data saved");
		}

	});
	}

		 });


app.listen(port,function () {
  console.log("Server is running "+port);
});
