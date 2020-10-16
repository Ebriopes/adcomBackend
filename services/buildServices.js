const Build = require('../models/Build');

module.exports={
	getBuilds: ( id ) => Build.find( { is_active: true, manager: id } ),
	getBuild: ( id ) => Build.findById( id ),
	createBuild: async( body, user ) => {
		const exists = await Build.exists( { address: body.address } );
		if ( exists ) {
			const inactive = await Build.findOne( { address: body.address } );
			inactive.is_active = true;
			inactive.manager = user._id;
			return inactive.save();
		}
		
		const schema = { ...body, manager: user._id };
		const build = new Build( schema );
		return build.save();
	},
	updateBuild: ( body, newBody ) => {
		const newBuild = Object.assign( body, newBody );
		return newBuild.save();
	},
	deleteBuild: ( build ) => {
		//return = Build.deleteOne( { _id: build._id }, ( err ) => err );
		build.is_active = false;
		return build.save();
	}
}
