const User	= require('../models/User');
const bcrypt= require('bcrypt') ;

module.exports = {
	getUsers: () => User.find( { is_active: true } ),
	getUser: ( id ) => User.findById( id ),
	createUser:	(body)	=> {
		const user = User(body);
		return user.save();
	},
	updateUser:	(oldBody, body) =>{
		const newUser = Object.assign(oldBody, body);
		return newUser.save()
	},
	/* addBuild: ( user, idBuild ) => {
		user.builds.push( idBuild )
		return user.save()
	}, */
	findByEmail: (email) => User.findOne({email: email}),
	comparePass: (pass, truePass) => bcrypt.compareSync(pass, truePass),
};
