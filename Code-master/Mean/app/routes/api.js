var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
module.exports =function(router){
router.post('/user',function(req,res){
	var user = new User();
	user.username =req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""){
		//res.send("");
		res.json({success:false,message:'Check all entery provided'});
	}
	else{
	user.save(function(err){
		if(err){
			///res.send("");
			res.json({success:false,message:'Data alerady exist'})
		}else{
			res.json({success:true,message:"user created"});
		}

	});
	}

		 });
		 router.post('/authenticate',function(req,res){
			User.findOne({username:req.body.username}).select('email username password').exec(function(err,user){
				if(err) throw err;
				if(!user){
					res.json({success:false,message:'Enter Right Username and Password' });
				}else if (user) {
						if(req.body.password){
						var validPassword ='null';
           validPassword = user.comparePassword(req.body.password);
		}
		else{
			res.json({success:false,message:'password is not provided'});
		}
			if(!validPassword){
				console.log("not matched.........")
				res.json({success:false,message:'Could not authenticate'});
			}
			else{
			var token =	jwt.sign({username:user.username,email:user.email},secret,{ expiresIn: '24h'});
				console.log("matched.........")
				res.json({success:true,message:'authenticated..................',token:token});
				
			}
				}
			});
		});
		 return router;

}
///////////////////////////////////////////////////////////////////////
