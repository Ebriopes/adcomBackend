const mongoose	= require('mongoose');
const bcrypt 	= require('bcrypt');
const SALT 		= process.env.SALT;

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	last_name: String,
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: Number,
	is_active: {
		type: Boolean,
		default: true,
	}
}, {
	timestamps: true
});

userSchema.pre('save', function (next) {
	const user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, (err, hash) => {
			if(err) return next(err);

			user.password = hash;
			next();
		})
	})
})

const User = mongoose.model('User', userSchema);

module.exports = User;