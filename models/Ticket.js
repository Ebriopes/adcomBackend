const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	mount: {
		type: Number,
		required: true,
	},
	date: {
		type: String,
	},
	address:{
		type: String,
		required: true,
	},
	refer:	String,
	depto:	Number,
	folio:	Number,
	concep:	String,
	type:	String,
	payment:String,
	is_active:{
		type: Boolean,
		default: true,
	}
}, {timestamps: true});

ticketSchema.pre('save', function(next){
	if( this.date === undefined) this.date = new Date().toLocaleDateString('es-MX');
	next();
});

const Ticket = new mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;