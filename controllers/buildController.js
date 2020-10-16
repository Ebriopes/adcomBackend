const buildService = require( '../services/buildServices' );
const userService = require( '../services/userServices' );
const Utils = require( '../utils/index' );

module.exports = {
	getBuilds: async ( req, res ) => {
		try {
			const builds = await buildService.getBuilds( req.params.id );
			builds.map( ( build ) => Utils.treeShake( build._doc ) );
			res.status( 200 ).send( builds );
		} catch ( error ) {
			res.status( 404 ).send( error );
		}
	},
	getBuild: async ( req, res ) => {
		try {
			const build = await buildService.getBuild( req.params.build );
			Utils.treeShake( build._doc );

			res.status( 200 ).send( build );
		} catch ( error ) {
			res.status( 404 ).send( error );
		}
	},
	createBuild: async ( req, res ) => {
		try {
			const build = await buildService.createBuild( req.body, req.params._id );
			Utils.treeShake( build._doc );

			res.status( 201 ).send( build );
		} catch ( error ) {
			res.status( 404 ).send( error );
		}
	},
	updateBuild: async ( req, res ) => {
		try {
			const build = await buildService.getBuild( req.params.build );
			const newBuild = await buildService.updateBuild( build, req.body );
			Utils.treeShake( newBuild._doc );
			/* //Code to change manager to a build
			if ( req.body.manager !== undefined ) {
				const oldManager = userService.getUser( req.paramas.id );
				const newManager = userService.getUser( req.body.manager );
			} */
			
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
			const build = await buildService.getBuild( req.params.build );

			if ( build.is_active === true && build.manager == req.params.id ) {
				await buildService.deleteBuild( build );
	
				/* const user = await userService.getUser( req.params.id );
				const i = user.builds.indexOf( req.params.build );
				user.builds.splice( i, 1 );
				await user.save(); */
				res.status( 202 ).send( { message: 'Build burn it' } );
			}else{
				res.status(404).send({message: "Build no found"})
			}
		} catch ( error ) {
			res.status( 409 ).send( error );
		}
	}
}
