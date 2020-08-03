const userServices = require('../services/userServices');

module.exports ={
	getUsers: async (req, res) => {
		try{
			const users = await userServices.getUsers();
			res.status(200).send(users);
		}catch (error) {
			res.status(404).send(error);
		}
	},
	getUser: async (req, res) => {
		try{
			const user = await userServices.getUser(req.params.id);
			res.status(200).send(user);
		}catch (error) {
			res.status(404).send(error);
		}
	},
	createUser: async (req, res) => {
		try{
			const user = await userServices.createUser(req.body);
			res.status(201).send(user);
		}catch (error) {
			res.status(401).send(error);
		}
	},
	updateUser: async (req, res) => {
		try{
			const user = await userServices.getUser(req.params.id)
			const newUser = await userServices.updateUser(user, req.body);
			res.status(200).send(newUser);
		}catch (error) {
			res.status(409).send(error);
		}
	},
	deleteUser: async (req, res) => {
		try{
			const user = await userServices.getUser(req.params.id)
			await userServices.createUser(user, {is_active: false});
			res.status(200).send({message: 'Tus recuerdos de la hora pico han sido eliminados'});
		}catch (error) {
			res.status(409).send(error);
		}
	},
	login: {
		
	}
}