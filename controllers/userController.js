const userServices	= require('../services/userServices');
const Utils 		= require('../utils');

module.exports ={
	getUsers: async (req, res) => {
		try{
			const users = await userServices.getUsers();
			users.map( ( user ) => Utils.treeShake( user._doc ) );
			res.status(200).send( users );
		}catch (error) {
			res.status(404).send(error);
		}
	},
	getUser: async (req, res) => {
		try{
			const user = await userServices.getUser( req.params.id );
			Utils.treeShake( user._doc );
			res.status(200).send( user );
		}catch (error) {
			res.status(404).send(error);
		}
	},
	createUser: async (req, res) => {
		try{
			const user = await userServices.createUser(req.body);
			Utils.treeShake( user._doc );
			res.status(201).send( user );
		}catch (error) {
			res.status( 401 ).send( error );
		}
	},
	updateUser: async (req, res) => {
		if ( req.files ) {
			//const { photo } = req.files
			//const upload = await Utils.uploadfile(photo.tempFilePath);
			//if(upload)
		}
		try{
			const user = await userServices.getUser( req.params.id );
			const newUser = await userServices.updateUser( user, req.body );
			Utils.treeShake( newUser._doc );
			res.status( 200 ).send( newUser );
		} catch ( error ) {
			res.status( 409 ).send( error );
		}
	},
	deleteUser: async (req, res) => {
		try{
			const user = await userServices.getUser( req.params.id );
			await userServices.updateUser( user, { is_active: false } );
			res.status( 200 ).send( { message: 'Tus recuerdos de la hora pico han sido eliminados' } );
		}catch (error) {
			res.status( 409 ).send( error );
		}
	},
	login: async (req, res) => {
		try {
			const user = await userServices.findByEmail( req.body.email );
			
			if(!user) {
				res.status(409).send({message: 'Data incorrect'});
			}

			const isMatch = await userServices.comparePass( req.body.password, user.password );
			
			if(!isMatch) res.status(409).send({message: 'Data incorrect'});

			const payload = {
				name: user.name,
				id:	  user._id,
				email:user.email,
			}
			
			const token = await Utils.createToken(payload);
			
			Utils.treeShake( user._doc );

			res.status( 200 ).send( { user: user, token: token } );
		} catch (error) {
			res.status(500).send(error);
		}
	}
}
