const jwt = require('jsonwebtoken');

module.exports = {
	validateToken: (req,res,next) =>{
		try {
			if(!req.headers.authorization) res.status(409).send({message: 'Token required'});
			
			const {authorization} = req.headers;
			const [bearer,token] = authorization.split(' ');

			if(!(bearer === 'Bearer')) res.status(403).send({message: 'Bad bearer'});

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.decoded = decoded;
			next();
		} catch (error) {
			res.status(403).send(error);
		}
	}
}