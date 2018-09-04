var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username :{type:String,lowercase:true,required:true},
	password :{type:String,required:true,unique:true },
	email:{type:String,required:true,unique:true}
	});

 module.exports = mongoose.model('userl',UserSchema);