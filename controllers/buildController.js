const buildService = require('../services/buildServices');
const userService = require('../services/userServices');
const Utils = require('../utils/index');

module.exports = {
	getBuilds: async (req, res) => {
		try {
			const builds = await buildService.getBuilds(req.decoded._id);
			res.status(200).send(builds);
		} catch (error) {
			res.status(500).send(error);
		}
	},
	getBuild: async (req, res) => {
		try {
			const build = await buildService.getBuild(req.body.build_id);

			res.status(200).send(build);
		} catch (error) {
			console.log(error);
			res.status(409).send(error);
		}
	},
	createBuild: async (req, res) => {
		try {
			const build = await buildService.createBuild(
				req.body,
				req.decoded._id,
				req.decoded.is_admin
			);

			const user = await userService.getUser(req.decoded._id)

			user.builds.push(build._id)
			await user.save()

			res.status(201).send(build);
		} catch (error) {
			console.log(error);
			res.status(409).send(error);
		}
	},
	updateBuild: async (req, res) => {
		try {
			const build = await buildService.getBuild(req.query.build_id);
			const newBuild = await buildService.updateBuild(build, req.body);

			res.status(202).send({
				message: 'Build modified',
				newBuild,
			});
		} catch (error) {
			res.status(409).send(error);
		}
	},
	deleteBuild: async (req, res) => {
		try {
			const build = await buildService.getBuild(req.body.build_id);

			if (
				build.is_active === true &&
				(build.manager == req.decoded._id || req.decoded.is_admin)
			) {
				await buildService.deleteBuild(build);

				res.status(202).send({ message: 'Build burn it' });
			} else {
				res.status(404).send({ message: 'Build no found' });
			}
		} catch (error) {
			res.status(409).send(error);
		}
	},
};
