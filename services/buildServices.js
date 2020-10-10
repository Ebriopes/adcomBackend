const Build = require('../models/Build');

module.exports={
	getBuilds: () => Build.find({is_active: true}),
	getBuild: (id) => Build.findById(id),
	createBuild: async ( body, user ) => {
		const schema = { ...body, manager: user._id };
		const build = new Build( schema );
		
		const response = {
			build: await build.save(),
			manager: await user.save(),
		};
		
		return response;
	},
	updateBuild: (body, newBody) =>{
		const newBuild = Object.assign(body, newBody);
		return newBuild.save();
	},
	deleteBuild: ( id ) => {
		const res = Build.deleteOne( { _id: id }, ( err ) => err );
		return res;
	}
}
