const User = require('../models/User.js');

module.exports = {
	getUsers:	()		=> User.find({is_active:true}),
	getUser:	(id)	=> User.findById(id),
	createUser:	(body)	=> {
		const user = User(body);
		return user.save();
	},
	updateUser:	(oldBody, body) =>{
		const newUser = Object.assign(oldBody, body);
		return newUser.save()
	}
};