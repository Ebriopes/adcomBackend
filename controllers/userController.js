const userServices = require('../services/userServices');
const Utils = require('../utils');

module.exports = {
	getUsers: async (req, res) => {
		try {
			if (req.decoded.is_admin) {
				const users = await userServices.getUsers();
				res.status(200).send(users);
			} else res.status(409).send({ message: 'Insufficent privileges' });
		} catch (error) {
			res.status(404).send(error);
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await userServices.getUser(
				req.decoded._id,
				'-is_active -is_admin -password -createdAt -updatedAt -__v',
				true
			);

			res.status(200).send(user);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	createUser: async (req, res) => {
		try {
			const existUser = await userServices.findByEmail(req.body.email);
			if (existUser) {
				res.status(400).send('This email already exists');
				return;
			} else {
				admin =
					req.decoded && req.decoded.is_admin && req.body.is_admin;
				const user = await userServices.createUser({
					...req.body,
					is_admin: admin,
				});
				res.status(201).send(
					await userServices
						.getUser(user._id)
						.select(
							'-is_active -is_admin -password -updatedAt -__v'
						)
				);
				return;
			}
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
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
			const { password, email } = req.body;

			const serverData = await userServices.findByEmail(
				email,
				'password -_id'
			);

			if (!serverData) {
				res.status(409).send({ message: 'Data incorrect' });
				return;
			}

			const isMatch = await Utils.comparePass(
				password,
				serverData.password
			);

			if (!isMatch) {
				res.status(409).send({ message: 'Data incorrect' });
				return;
			}

			const user = await userServices.findByEmail(
				email,
				'-__v -is_active -createdAt -updatedAt -password'
			);

			const payload = { ...user._doc };

			const token = await Utils.createToken(payload);

			res.status(200).send({ token });
		} catch (error) {
			console.log(500);
			res.status(500).send({ error });
		}
	},
};
