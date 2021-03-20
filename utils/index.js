const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LOGIN = process.env.JWT_LOGIN;

cloudinary.config({
	cloudname: process.env.CLOUDNAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

module.exports = {
	createToken: (payload) =>
		jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }),
	treeShake: (json) => {
		delete json.is_active;
		delete json.password;
		delete json.createdAt;
		return json;
	},
	uploadfile: (tempfiles) => {
		return new Promise((resolve, reject) => {
			cloudinary.upload();
		});
	},
	comparePass: (pass, truePass) => bcrypt.compareSync(pass, truePass),
	loginToken: (token) => jwt.verify(token, JWT_LOGIN),
};
