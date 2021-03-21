const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

cloudinary.config({
	cloudname: process.env.CLOUDNAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

module.exports = {
	createToken: (payload) =>
		jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }),

	uploadfile: (tempfiles) => {
		return new Promise((resolve, reject) => {
			cloudinary.upload();
		});
	},
	comparePass: (pass, truePass) => bcrypt.compareSync(pass, truePass),
};
