const Build = require('../models/Build');

module.exports = {
	getBuilds: (id) => Build.find({ is_active: true, manager: id }),
	getBuild: (id) => Build.findById(id,'-__v').populate('tickets', '-__v'),
	createBuild: async (body, user, admin) => {
		const exists = await Build.exists({ address: body.address });
		if (exists && admin && body.name) {
			const inactive = await Build.findOne({ address: body.address });
			inactive.is_active = true;
			inactive.address = body.address;
			inactive.name = body.name;
			inactive.manager = user;
			return inactive.save();
		}

		const schema = { ...body, manager: user };
		const build = new Build(schema);
		return build.save();
	},
	updateBuild: (body, newBody) => {
		const newBuild = Object.assign(body, newBody);
		return newBuild.save();
	},
	deleteBuild: (build) => {
		//return = Build.deleteOne( { _id: build._id }, ( err ) => err );
		build.is_active = false;
		return build.save();
	},
};
