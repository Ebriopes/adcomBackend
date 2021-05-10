const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mount: {
			type: Number,
			required: true,
		},
		manager: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		build: {
			type: Schema.Types.ObjectId,
			ref: 'Build',
			required: true,
		},
		depto: Number,
		date: String,
		refer: String,
		address: String,
		folio: Number,
		concept: String,
		type: String,
		payment: String,
		is_active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

ticketSchema.pre('save', function (next) {
	if (this.date === undefined)
		this.date = new Date().toLocaleDateString('es-MX');
	next();
});

const Ticket = new mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
