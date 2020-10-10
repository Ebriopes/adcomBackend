const buildService = require( '../services/buildServices' );
const userService = require( '../services/userServices' );

module.exports = {
	getBuilds: async (req, res) => {
		try {
			const Builds = await BuildService.getBuilds();
			res.status(200).send(Builds);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	getBuild: async (req, res) => {
		try {
			const build = await buildService.getBuild(req.params.build);
			res.status(200).send(build);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	createBuild: async (req, res) => {
		try {
			const manager = await userService.getUser( req.params.id );
			const build = await buildService.createBuild( req.body, manager );
			//await userService.updateUser( manager, { builds: [ ...manager.builds, build._id ] } )
			res.status(201).send(build);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	updateBuild: async (req, res) => {
		try {
			const build = await buildService.getBuild(req.params.build);
			const newBuild = await buildService.updateBuild(build, req.body);
			res.status(202).send({
				message: 'Build modified',
				newBuild
			});
		} catch (error) {
			res.status(409).send(error);
		}
	},
	deleteBuild: async (req, res) => {
		try {
			const del = await buildService.deleteBuild( req.body.buildId );
			res.status( 202 ).send( { message: del } );
			/* const build = await buildService.getBuild( req.body.build );
			if(build.is_active === true){
				await buildService.updateBuild(build, {is_active: false});
				res.status(200).send({message: "Build burn it"});
			}else{
				res.status(404).send({message: "Build no found"})
			} */
		} catch (error) {
			res.status(409).send(error);
		}
	}
}
