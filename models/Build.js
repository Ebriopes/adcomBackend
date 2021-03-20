const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
			unique: true,
		},
		manager: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		tickets: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Ticket',
			},
		],
		is_active: {
			type: Boolean,
			default: true,
		},
		deptos: [
			{
				name: String,
				number: Number,
				debt: Boolean,
			},
		],
	},
	{ timestamps: true }
);

const Build = new mongoose.model('Build', buildSchema);

module.exports = Build;
