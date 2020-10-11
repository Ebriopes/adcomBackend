const buildService = require( '../services/buildServices' );
const userService = require( '../services/userServices' );

module.exports = {
	getBuilds: async ( req, res ) => {
		try {
			const manager = await userService.getUser( req.params.id );
			const builds = await buildService.getBuilds( manager._id );
			res.status( 200 ).send( builds );
		} catch ( error ) {
			res.status( 404 ).send( error );
		}
	},
	getBuild: async ( req, res ) => {
		try {
			const manager = await userService.getUser( req.params.id );
			const response = manager.builds.includes(req.params.build) ?
				await buildService.getBuild( req.params.build ) :
				{ message: 'There isn\'t build' };
			res.status( 200 ).send( response );
			console.info( response );
		} catch ( error ) {
			res.status( 404 ).send( error );
		}
	},
	createBuild: async ( req, res ) => {
		try {
			const manager		= await userService.getUser( req.params.id );
			const build			= await buildService.createBuild( req.body, manager._id );
			const managerUpdate = {
				build: build,
				manager: await userService
						.updateUser( manager,
							{ builds: [ ...manager.builds, build._id ] } ),
			};

			res.status( 201 ).send( managerUpdate );
		} catch ( error ) {
			res.status( 404 ).send( error );
		}
	},
	updateBuild: async ( req, res ) => {
		try {
			const build = await buildService.getBuild( req.params.build );
			const newBuild = await buildService.updateBuild( build, req.body );
			res.status( 202 ).send( {
				message: 'Build modified',
				newBuild
			} );
		} catch ( error ) {
			res.status( 409 ).send( error );
		}
	},
	deleteBuild: async ( req, res ) => {
		try {
			const user = await userService.getUser( req.params.id );
			//user.splice( user.findIndex( req.params.build ), 1 );
			//const build = await buildService.deleteBuild( req.params.build );
			//console.info( del );
			console.info( 'test' );
			const i = user.builds.indexOf( req.params.build );
			console.info( user.builds, i );
			//const response = await del.save();
			res.status( 202 ).send( { message: 'all fine' } );
			/* const build = await buildService.getBuild( req.body.build );
			if(build.is_active === true){
				await buildService.updateBuild(build, {is_active: false});
				res.status(200).send({message: "Build burn it"});
			}else{
				res.status(404).send({message: "Build no found"})
			} */
		} catch ( error ) {
			res.status( 409 ).send( error );
		}
	}
}
