const Ticket = require('../models/Ticket.js')

module.exports={
	getTickets: () => Ticket.find({is_active: true}),
	getTicket: (id) => Ticket.findById(id),
	createTicket: (body) => {
		const ticket = Ticket(body);
		return ticket.save();
	},
	updateTicket: (body, newBody) =>{
		const newTicket = Object.assign(body, newBody);
		return newTicket.save();
	}
}