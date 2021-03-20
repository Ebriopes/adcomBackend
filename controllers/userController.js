const userServices = require('../services/userServices');
const Utils = require('../utils');

module.exports = {
	getUsers: async (req, res) => {
		try {
			if (req.decoded.is_admin) {
				const users = await userServices.getUsers();
				users.map((user) => Utils.treeShake(user._doc));
				res.status(200).send(users);
			} else res.status(409).send({ message: 'Insufficent privileges' });
		} catch (error) {
			res.status(404).send(error);
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await userServices.getUser(req.decoded._id);
			Utils.treeShake(user._doc);

			res.status(200).send(user);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	createUser: async (req, res) => {
		try {
			const user = await userServices.createUser(req.body);
			Utils.treeShake(user._doc);
			res.status(201).send(user);
		} catch (error) {
			res.status(401).send(error);
		}
	},
	updateUser: async (req, res) => {
		if (req.files) {
			//const { photo } = req.files
			//const upload = await Utils.uploadfile(photo.tempFilePath);
			//if(upload)
		}
		try {
			const user = await userServices.getUser(req.decoded._id);
			const newUser = await userServices.updateUser(user, req.body);
			Utils.treeShake(newUser._doc);
			res.status(200).send(newUser);
		} catch (error) {
			res.status(409).send(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			const user = await userServices.getUser(req.body.id);
			await userServices.updateUser(user, { is_active: false });
			res.status(200).send({
				message: 'Tus recuerdos de la hora pico han sido eliminados',
			});
		} catch (error) {
			res.status(409).send(error);
		}
	},
	login: async (req, res) => {
		try {
			const { password, email } = Utils.loginToken(req.body.login);

			const user = await userServices.findByEmail(email);

			if (!user) res.status(409).send({ message: 'Data incorrect' });

			const isMatch = await Utils.comparePass(password, user.password);

			if (!isMatch) res.status(409).send({ message: 'Data incorrect' });

			Utils.treeShake(user._doc);

			const payload = { ...user._doc };

			const token = await Utils.createToken(payload);

			res.status(200).send({ token });
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	},
};
