const User = require('../models/User');

module.exports = {
	getUsers: () => User.find({ is_active: true }),
	getUser: (id, fields, populate) =>
		User.findById(id,fields)
			.populate(populate ? 'builds' : null),
	createUser: (body) => {
		const user = User(body);
		return user.save();
	},
	updateUser: (oldBody, body) => {
		const newUser = Object.assign(oldBody, body);
		return newUser.save();
	},
	/* addBuild: ( user, idBuild ) => {
		user.builds.push( idBuild )
		return user.save()
	}, */
	findByEmail: (email, fields) => User.findOne({ email }).select(fields),
};
