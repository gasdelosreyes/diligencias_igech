const mongoose= require('mongoose');


var UserSchema=new mongoose.Schema({
	email:{
		type:String,
		trim:true,
		required:[true,'The user needs an email' ],
		unique:true
	},
	password:{
		type:String,
		trim:true,
		required:[true,'The user needs a password']
	}
});
module.exports=mongoose.model('User',UserSchema);