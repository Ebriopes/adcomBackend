const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ticketSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	mount: {
		type: Number,
		required: true,
	},
	address:{
		type: String,
		required: true,
	},
	date:	String,
	refer:	String,
	depto: {
		type: Schema.Types.ObjectId,
		ref: 'Build',
		required: true
	},
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
