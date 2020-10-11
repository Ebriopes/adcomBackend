const Build = require('../models/Build');

module.exports={
	getBuilds: ( id ) => Build.find( { is_active: true, manager: id } ),
	getBuild: ( id ) => Build.findById( id ),
	createBuild: async ( body, user ) => {
		const schema = { ...body, manager: user._id };
		const build = new Build( schema );
		return await build.save();
	},
	updateBuild: ( body, newBody ) => {
		const newBuild = Object.assign( body, newBody );
		return newBuild.save();
	},
	deleteBuild: ( id ) => {
		const res = Build.deleteOne( { _id: id }, ( err ) => err );
		//const res = await getBuild( id );
		return res;
	}
}
