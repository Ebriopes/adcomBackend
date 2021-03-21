const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT = +process.env.SALT;

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		last_name: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
		},
		photo: String,
		phone: Number,
		builds: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Build',
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
